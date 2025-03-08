import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f7] text-[#1d1d1f]">
      <div className="mx-auto max-w-[980px] px-4 py-12">
        {/* Disclaimer */}
        <div className="border-b border-[#d2d2d7] pb-4">
          <p className="text-xs leading-[1.33337] text-[#6e6e73]">
            Apple TV+ yêu cầu đăng ký thuê bao.
          </p>
        </div>

        {/* Main Footer as */}
        <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Shop and Learn */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold">Mua Sắm Và Tìm Hiểu</h3>
            <ul className="space-y-2 text-xs">
              {[
                "Cửa Hàng",
                "Mac",
                "iPad",
                "iPhone",
                "Watch",
                "AirPods",
                "TV & Nhà",
                "AirTag",
                "Phụ Kiện",
              ].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[#424245] hover:text-[#1d1d1f]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="pt-4 text-xs font-semibold">Ví Apple</h3>
            <ul className="space-y-2 text-xs">
              {["Ví", "Apple Pay"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[#424245] hover:text-[#1d1d1f]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entertainment */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold">Giải Trí</h3>
            <ul className="space-y-2 text-xs">
              {[
                "Apple One",
                "Apple TV+",
                "Apple Music",
                "Apple Arcade",
                "Apple Podcasts",
                "Apple Books",
              ].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[#424245] hover:text-[#1d1d1f]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apple Store */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold">Apple Store</h3>
            <ul className="space-y-2 text-xs">
              {[
                "Ứng Dụng Apple Store",
                "Apple Trade In",
                "Tài Chính",
                "Tình Trạng Đơn Hàng",
                "Hỗ Trợ Mua Hàng",
              ].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[#424245] hover:text-[#1d1d1f]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Business */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold">Dành Cho Doanh Nghiệp</h3>
            <ul className="space-y-2 text-xs">
              {["Apple Và Doanh Nghiệp", "Mua Hàng Cho Doanh Nghiệp"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-[#424245] hover:text-[#1d1d1f]"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <h3 className="pt-4 text-xs font-semibold">Cho Giáo Dục</h3>
            <ul className="space-y-2 text-xs">
              {["Apple Và Giáo Dục", "Mua Hàng Cho Bậc Đại Học"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[#424245] hover:text-[#1d1d1f]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Apple Values */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold">Giá Trị Cốt Lõi Của Apple</h3>
            <ul className="space-y-2 text-xs">
              {[
                "Trợ Năng",
                "Môi Trường",
                "Quyền Riêng Tư",
                "Chuỗi Cung Ứng",
              ].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-[#424245] hover:text-[#1d1d1f]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Store Locator */}
        <div className="border-b border-[#d2d2d7] py-4 text-xs text-[#6e6e73]">
          <p>
            Xem thêm cách để mua hàng:{" "}
            <Link to="#" className="text-[#0066cc] hover:underline">
              Tìm cửa hàng bán lẻ
            </Link>{" "}
            gần bạn. Hoặc gọi 1800 1192.
          </p>
        </div>

        {/* Legal Footer */}
        <div className="pt-4 text-xs text-[#6e6e73]">
          <div className="flex flex-col justify-between space-y-4 md:flex-row md:space-y-0">
            <p>Bản quyền © 2024 Apple Inc. Bảo lưu mọi quyền.</p>
            <p>Việt Nam</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {[
              "Chính Sách Quyền Riêng Tư",
              "Điều Khoản Sử Dụng",
              "Bán Hàng Và Hoàn Tiền",
              "Pháp Lý",
              "Bản Đồ Trang Web",
            ].map((item) => (
              <Link key={item} to="#" className="hover:underline">
                {item}
              </Link>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <p>Công Ty TNHH Apple Việt Nam</p>
            <p className="text-[11px]">
              ĐKKD số 0313510827, do Sở KH&ĐT thành phố Hồ Chí Minh cấp ngày 28
              tháng 10 năm 2015
            </p>
            <p className="text-[11px]">
              Địa chỉ: Phòng 901, Ngôi Nhà Đức Tại Tp. Hồ Chí Minh, số 33, đường
              Lê Duẩn, Phường Bến Nghé, Quận 1, thành phố Hồ Chí Minh, Việt Nam
            </p>
            <p>Điện thoại: 1800 1192</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
