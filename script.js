const SHEET_ID = '1YxMWaGhyURAuVBEKX9HaTY3ZbVUcmWBrlNxSefHhZJ8'; // 스프레드시트 ID를 여기에 입력
const API_KEY = 'AIzaSyB9b3p2Z8f0ufVFI3x2wewvbiyWhWr5FgY'; // API 키를 여기에 입력
const SHEET_NAME = 'Sheet1'; // 시트 이름 (보통 "Sheet1")

async function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values; // 시트 데이터 배열 반환
}

function createFlashcards(data) {
    const container = document.getElementById('flashcard-container');
    data.slice(1).forEach(row => { // 첫 번째 행(헤더) 제외
        const flashcard = document.createElement('div');
        flashcard.className = 'flashcard';
        
        const front = document.createElement('div');
        front.textContent = row[0]; // 단어
        const back = document.createElement('div');
        back.textContent = `${row[1]} \n\n예문: ${row[2] || ''}`; // 뜻과 예문
        back.className = 'hidden';

        flashcard.appendChild(front);
        flashcard.appendChild(back);
        container.appendChild(flashcard);

        flashcard.addEventListener('click', () => {
            front.classList.toggle('hidden');
            back.classList.toggle('hidden');
        });
    });
}

fetchSheetData()
    .then(data => createFlashcards(data))
    .catch(error => console.error('Error fetching data:', error));
