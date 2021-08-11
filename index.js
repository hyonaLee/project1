
      // 변수 선언 모음
      const date = document.getElementById("date");
      const content = document.getElementById("content");
      const rate = document.getElementById("rate");
      const historyContent = document.getElementById("history_content");
      const newInput = document.getElementById("new");
      const inputBtn = document.getElementById("input_btn");
      const grandTotal = document.getElementById("grand-total");
      const plus = document.getElementById("plus");
      const minus = document.getElementById("minus");
      const pagingCount = document.getElementById("pagingCount");

      //로컬스토리지 저장소
      const rateHistory = localStorage.getItem("history2");
      let historyObject = JSON.parse(rateHistory);
      if (rateHistory === null) historyObject = [];
      // console.log(rateHistory)
      //console.log(historyObject[i].rate)

      newHistory(); //내용출력

      //새로운 내역 받아 저장하기
      function inputContent() {
        const radio = document.getElementsByName("content");
        const radioSelect = radio[0].checked === true ? "+" : "-";
        const myHistory = {
          date: date.value,
          content: content.value,
          rate: rate.value,
          radio: radioSelect,
        };

        historyObject.push(myHistory);
        localStorage.setItem("history2", JSON.stringify(historyObject));
        content.value = "";
        rate.value = "";

        newHistory();
        closeBtn();
      }
      //내역 출력하기
      function newHistory(...currentNum) {
        const newArr = historyObject.slice(currentNum * 3, currentNum * 3 + 3); 
        let list = "";
        newArr.forEach((item, index) => {
          const userate = parseInt(item.rate);
          list += `
            <div id="history-list">
                <h3>${item.date}</h3>
                <p id="one">${item.content}<p>
                <p id="two">${item.radio + userate.toLocaleString()}<p>
                <span id="del-btn" onclick="remove()">삭제<span>
            </div>
            `;
        });
        historyContent.innerHTML = list;
        totalSet();
        paging();
      }
      //페이징 
      function paging() {
        const onePageCount = 3; //한페이지에 보여 줄 개수
        totalPate = Math.ceil(historyObject.length / onePageCount); // 3
        let countList = "";
        for (i = 0; i < totalPate; i++) {
          countList += `<div id="page" onclick="newHistory(${i})">[${i + 1}]</div>`;
        }
        pagingCount.innerHTML = countList;
      }

      //정렬최신날짜순
      function arrayForDate() {
        let list = "";
        historyObject.forEach((item, index) => {
          const userate = parseInt(item.rate);
          const forDate = historyObject.sort(function (a, b) {
            return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
          });
          list += `
            <div id="history-list">
                <h3>${item.date}</h3>
                <p id="one">${item.content}<p>
                <p id="two">${item.radio + userate.toLocaleString()}<p>
                <span id="del-btn" onclick="remove()">삭제<span>
            </div>
            `;
        });
        historyContent.innerHTML = list;
        totalSet();
      }

      //정렬 수입만
      function arrayForIncome() {
        let list = "";

        historyObject.forEach((item, index) => {
          const userate = parseInt(item.rate);
          if (item.radio == "+") {
            list += `
            <div id="history-list">
                <h3>${item.date}</h3>
                <p id="one">${item.content}<p>
                <p id="two">${item.radio + userate.toLocaleString()}<p>
                <span id="del-btn" onclick="remove()">삭제<span>
            </div>
            `;
          }
        });

        historyContent.innerHTML = list;
        totalSet();
      }
      //정렬 지출만
      function arrayForExpense() {
        let list = "";

        historyObject.forEach((item, index) => {
          const userate = parseInt(item.rate);
          if (item.radio == "-") {
            list += `
            <div id="history-list">
                <h3>${item.date}</h3>
                <p id="one">${item.content}<p>
                <p id="two">${item.radio + userate.toLocaleString()}<p>
                <span id="del-btn" onclick="remove()">삭제<span>
            </div>
            `;
          }
        });

        historyContent.innerHTML = list;
        totalSet();
      }

      function totalSet() {
        // grandtotal 금액 구하기
        //map사용
        const maaap = historyObject.map((value, index) => {
          return parseInt(value.radio + value.rate);
        });
        //reduce사용
        const reduceSum = maaap.reduce((acc, current) => {
          return acc + current;
        }, 0);
        grandTotal.innerHTML = reduceSum.toLocaleString();

        // 들어온돈나간돈 total 금액 구하기
        const filterpluseSum = maaap
          .filter((value) => value > 0)
          .reduce((acc, current) => acc + current, 0);
        const filterminusSum = maaap
          .filter((value) => value < 0)
          .reduce((acc, current) => acc + current, 0);
        minus.innerHTML = filterminusSum.toLocaleString();
        plus.innerHTML = `+${filterpluseSum.toLocaleString()}`;
      }

      //삭제하기
      function remove(index) {
        historyObject.splice(index, 1);
        localStorage.setItem("history2", JSON.stringify(historyObject));

        newHistory();
      }

      // 새로운 내역을 추가하세요 버튼 클릭 시 새로운 거래 입력창 오픈
      function createBtn() {
        const newInput = document.getElementById("new");
        newInput.style.display = "block";
      }
      // 닫기 버튼 클릭 시 창 닫기
      function closeBtn() {
        const newInput = document.getElementById("new");
        newInput.style.display = "none";
      }