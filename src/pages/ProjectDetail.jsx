import React, { useState } from "react";

export default function ProjectDetail() {
  return (
    <>
      <nav className="fixed top-0 left-0 w-screen z-[99998] bg-black">
        <div id="top-header" className="w-full p-5 flex justify-between">
          <figure className="h-[60px]">
            <img className="w-full h-full" src="/logo.png" alt="" />
          </figure>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-white boldonse-regular inline-block p-5 hover:underline text-lg"
            >
              Showcase
            </a>
            <a
              href="#"
              className="text-white boldonse-regular inline-block p-5 hover:underline text-lg"
            >
              About us
            </a>
            <a
              href="#"
              className="text-white boldonse-regular inline-block p-5 hover:underline text-lg"
            >
              Contact
            </a>
          </div>
        </div>
        <div id="sub-header" className="w-full flex">
          <div className="w-[700px] h-[135px]">
            <h1
              id="page-title"
              className="uppercase boldonse-regular text-white !text-[90px]"
            >
              Showcase
            </h1>
          </div>
          <div className="flex-1 flex items-end justify-between gap-2 pl-10 pr-6">
            {[
              "festival",
              "decoration",
              "event",
              "set design",
              "exhibition",
              "POSM",
              "graphic",
            ].map((item, idx) => {
              const [isActive, setIsActive] = useState(idx == 0);

              return (
                <a
                  href="#"
                  key={item}
                  className={`inline-block bricolage-grotesque text-[28px] ${
                    isActive ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsActive((prev) => !prev);
                  }}
                >
                  {item}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
      <div className="wrapper w-screen min-h-screen bg-black pt-[400px]">
        <h2 className="boldonse-regular uppercase text-white text-5xl text-center mb-12 leading-normal">
          AURORA'S CRY - FASHION SHOW <br /> MINHTUAN COUTURE NO.4
        </h2>
        <div className="px-[96px] pb-[80px]">
          <figure className="text-center flex w-full justify-center items-center mb-5">
            <img src="/test.png" alt="" className="w-[80%]" />
          </figure>

          <p className="text-white mb-5 bricolage-grotesque text-2xl text-center">
            Lấy cảm hứng từ hiện tượng cực quang, show diễn “𝐀𝐮𝐫𝐨𝐫𝐚’𝐬 𝐂𝐫𝐲 –
            𝐅𝐀𝐒𝐇𝐈𝐎𝐍 𝐒𝐇𝐎𝐖 𝐌𝐈𝐍𝐇𝐓𝐔𝐀𝐍 𝐂𝐎𝐔𝐓𝐔𝐑𝐄 𝐍𝐨.𝟒”” là một hành trình thị giác nơi
            ánh sáng, không gian và thời trang hòa quyện để kể nên một câu
            chuyện sâu lắng bằng sự tĩnh lặng và chuyển động. Với đề bài từ 𝐍𝐓𝐊
            𝐍𝐠𝐮𝐲𝐞̂̃𝐧 𝐌𝐢𝐧𝐡 𝐓𝐮𝐚̂́𝐧 : tạo nên một sân khấu tối giản để tôn vinh trọn
            vẹn các thiết kế trong bộ sưu tập, 𝐏𝐫𝐨𝐣𝐞𝐜𝐭:𝐄 đã có cơ hội được đồng
            hành cùng 𝐆𝐢𝐚́𝐦 đ𝐨̂́𝐜 𝐦𝐲̃ 𝐭𝐡𝐮𝐚̣̂𝐭 Linh Dak và Đ𝐚̣𝐨 𝐝𝐢𝐞̂̃𝐧 Trần Tú trong việc
            phát triển sân khấu dựa trên những phác thảo đầu tiên cho đến khi
            bản cuối cùng được hình thành. Sự tối giản không đồng nghĩa với đơn
            điệu. Trên nền đen tuyệt đối, ánh sáng aurora chuyển sắc, từng bước
            catwalk trở thành điểm nhấn. Tất cả được cân nhắc kỹ lưỡng để từng
            bộ trang phục thật sự trở thành nhân vật chính. Xin cảm ơn vì lời
            mời hợp tác và định hướng thị giác đầy cảm hứng đến từ các anh em.
            Cảm ơn bạn trong team 𝐏𝐫𝐨𝐣𝐞𝐜𝐭:𝐄 vì đã luôn tận tâm – để cùng nhau
            hiện thực hóa một sân khấu giản dị nhưng sâu sắc.
          </p>

          <figure className="text-center flex w-full justify-center items-center">
            <img src="/test.png" alt="" className="w-[80%]" />
          </figure>
        </div>
      </div>
    </>
  );
}
