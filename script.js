document.addEventListener("DOMContentLoaded", function () {
    // 메뉴 클릭 시 서브메뉴 토글
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const submenu = document.getElementById(targetId);
            if (submenu) {
                submenu.style.display = submenu.style.display === "block" ? "none" : "block";
 
            }
        });
    });

    // 하위 항목 클릭 시 내용 로드
    document.querySelectorAll(".submenu li").forEach(subitem => {
        subitem.addEventListener("click", function (event) {
            event.stopPropagation(); // 부모 요소 클릭 이벤트 방지
            event.preventDefault(); // 기본 링크 동작을 막고
            const contentId = this.getAttribute("data-content");
            const contentArea = document.getElementById("content-area");
    
            const contentMap = {
                "course1" : "course1.html",
                "course2" : "course2.html",
                "note1" : "note1.html",
                "note2" : "note2.html",
                "experiment1" : "experiments.html"
            };

            const iframe = document.createElement("iframe");
            iframe.src = contentMap[contentId];
            iframe.onload = function() {
                // iframe 로딩 후 카드 뒤집기 이벤트 추가
                const cards = iframe.contentWindow.document.querySelectorAll(".card");
                cards.forEach(card => {
                    card.addEventListener("click", function () {
                        this.classList.add("flipped");
                        const isCorrect = this.getAttribute("data-answer") === "true";
                        this.querySelector(".card-back").classList.add(isCorrect ? "correct" : "incorrect");
                    });
                });
            };


            // content-area를 비우고 iframe을 삽입
            contentArea.innerHTML = "";
            contentArea.appendChild(iframe);
    
            
        });
    });
});