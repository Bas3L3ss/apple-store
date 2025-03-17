import { RequestHandler } from "express";
import { stripe } from "../../utils/stripe";
import { CartItem, ShippingAddress } from "../../@types";
import { ProductModel } from "../../models/Product";
import { AuthenticatedRequest } from "../../middlewares/check-bearer-token";

export const createCheckoutSession: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    const {
      cartItems,
      orderNotes,
      shippingAddress,
    }: {
      cartItems: CartItem[];
      orderNotes: string;
      shippingAddress: ShippingAddress;
    } = req.body;
    console.log(req.body);

    if (!req.auth) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }

    const { username, email, role, verified, id: userId } = req.auth;

    if (!verified) {
      return next({ statusCode: 403, message: "Account not verified" });
    }
    const existingCustomers = await stripe.customers.list({ email });

    let customer;
    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email,
        name: username,
        metadata: {
          role,
          userId,
        },
      });
    }

    try {
      const line_items = await Promise.all(
        cartItems.map(async (item) => {
          const product = await ProductModel.findById(item.productId);
          if (!product) throw new Error("Product not found");

          const productImage = product.productImages?.[0] || "";

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
                images: productImage ? [productImage] : [],
                metadata: {
                  productId: product._id.toString(),
                  selectedOptions: JSON.stringify(item.selectedOptions || []),
                },
              },
              unit_amount: Math.round(item.totalPrice * 100),
            },
            quantity: 1,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: line_items,
        customer: customer.id,
        success_url: `${req.headers.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          shippingAddress: JSON.stringify(shippingAddress),
          orderNotes,
        },
        cancel_url: `${req.headers.origin}/checkout-cancelled`,
      });

      res.json({ url: session.url });
    } catch (error) {
      console.log("inner error");
      console.error("Checkout session creation error:", error);

      next({ statusCode: 500, message: "Failed to create checkout session." });
    }
  } catch (err) {
    console.log("outer error:");
    console.error("Checkout session creation error:", err);
    next({ statusCode: 500, message: "Failed to create checkout session." });
  }
};
