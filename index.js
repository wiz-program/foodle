import { foods } from './foods.js';
import { kanaList } from './kana.js';


// お題をランダム取得
const answer = foods[Math.floor(Math.random() * foods.length)];
const answerArray = [...answer];

// 文字制限
const WORD_LENGTH = 4;
// カウント用
let counter = 0;
// ゲームのフラグ
let isGameOver = false;
// 確認用
console.log(answer);

// 4文字以下の場合のアラート
const validInput = (inputArray) => {
    if ( inputArray.length != WORD_LENGTH ) {
        alert(`${WORD_LENGTH}文字にしてください`)
        return false;
    }
    return true;
};

// 終了して答えを表示させる関数
const showAnswer = () => {
    let result = document.getElementById('result');
    result.textContent = `正解は「${answer}」でした！`
    
    result.classList.remove('hidden');
    const resetButton = document.getElementById('resetButton');
    resetButton.textContent = 'もう一度遊ぶ';
    resetButton.style.display = 'inline-block';

    resetButton.addEventListener('click', () => {
        location.reload();
    } );
};

// クリックしたときの動作
const clickHandler = () => {
    if (isGameOver) return; // ゲーム終了時は反応しない

    const wordInput = document.getElementById('wordInput');
    const input = wordInput.value;
    const inputArray = [...input];

    if (!validInput(inputArray)) return;

    // 何回目の入力かに応じて列とマスを取得
    const row = document.getElementById(`row${counter}`)
    const cells = row.getElementsByClassName('cell')

    for(let i = 0; i < WORD_LENGTH; i++) {
        // 文字をボードに反映
        cells[i].textContent = inputArray[i];

        // 正誤判定
        if (inputArray[i] === answerArray[i]) {
            cells[i].classList.add('correct');
        } else if (answerArray.includes(inputArray[i])) {
            cells[i].classList.add('present');
        } else {
            cells[i].classList.add('absent');
        };
    }

    // キーボードにも色を付ける
    inputArray.forEach((char, i) => {
        const kanaKey = document.querySelector(`.kana[data-char="${char}"]`);
        if (!kanaKey) return; //なければスキップ

        const isCorrect = char === answerArray[i];
        const isPresent = answerArray.includes(char);

        // すでにcorrectがついていたら反映しない
        if (isCorrect) {
            kanaKey.classList.remove('present', 'absent');
            kanaKey.classList.add('correct');
        } else if (isPresent) {
            if (!kanaKey.classList.contains('correct')) {
                kanaKey.classList.remove('absent');
                kanaKey.classList.add('present');
            }
        } else  {
            // 正解・含まれていない → absent
            kanaKey.classList.remove('correct', 'present');
            kanaKey.classList.add('absent');
        }

    })

    wordInput.value = ''; // 入力欄のリセット
    counter++; // １回入力した履歴を追加
    wordInput.focus(); // 送信ボタンを押しても入力欄にカーソルが残るように

    // 正解したときの処理
    if (input === answer) {
        alert('正解です！')
        wordInput.disabled = true; // 入力不可に
        isGameOver = true; //ゲーム終了
        showAnswer();
        return;
    }

    // 失敗したときの処理
    if (counter >=5 ) {
        alert(`終了！正解は「${answer}」でした！`)
        wordInput.disabled = true; // 入力不可に
        isGameOver = true; // ゲーム終了
        showAnswer();
    };
};

// 送信ボタンを押したあとの動作
document.getElementById('submitBtn').addEventListener('click', () => {
    clickHandler();
});

// Enterを押しても送信ボタンと同じ動作、Spaceを押しても反応しない
    const wordInput = document.getElementById('wordInput');
    wordInput.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            return;
        }
        if (e.key === 'Enter') {
            clickHandler();
        };
    });
    wordInput.addEventListener('input', () => {
        wordInput.value = wordInput.value.replace(/\s/g, '');
    });

// 非同期で別ファイルからモーダルを取得、反映
fetch('rule-modal.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('modalContainer').innerHTML = html;

    // 説明をモーダル形式で表示
    const ruleButton = document.getElementById('ruleButton');
    const overlay = document.getElementById('overlay');
    ruleButton.addEventListener('click', () => {
    overlay.classList.remove('hidden');
    });

    // モーダルを閉じる関数
    const closeOverlay = () => {
        overlay.classList.add('hidden');
    };

    // 閉じるボタンを押してモーダルを閉じる
    const closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', () => {
        closeOverlay();
    });

    // モーダル外をクリックしても閉じる
    overlay.addEventListener('click', (e) => {
        if ( e.target === overlay ) {
            closeOverlay();
        }});

    // モーダル表示時にモーダル外のスクロールを防ぐ
    const modal = document.getElementById('modal');

    modal.addEventListener('wheel', (e) => {
        const delta = e.deltaY;
        const atTop = modal.scrollTop === 0;
        const atBottom = modal.scrollHeight - modal.scrollTop === modal.clientHeight;

        if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
            e.preventDefault();
        }

    }, { passive: false });
});

// 食べもの一覧を非同期で表示

fetch('foods-modal.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('foodsModalContainer').innerHTML = html;

        const foodsOverlay = document.getElementById('foodsOverlay');
        
        const foodsListContainer = document.getElementById('foodsListContainer');
    
        // クリックで表示
        document.getElementById('foodsList').addEventListener('click', () => {
            foodsOverlay.classList.remove('hidden');
        })

        // モーダルを閉じる関数
        const closeFoodsOverlay = () => {
            foodsOverlay.classList.add('hidden');
        };

         // 閉じるボタンを押してモーダルを閉じる
        const closeFoodsButton = document.getElementById('closeFoodsButton');
        closeFoodsButton.addEventListener('click', () => {
            closeFoodsOverlay();

        // モーダル外をクリックしても閉じる
        foodsOverlay.addEventListener('click', (e) => {
            if ( e.target === foodsOverlay ) {
                closeFoodsOverlay();
        }});

        // モーダル表示時にモーダル外のスクロールを防ぐ
        const foodsModal = document.getElementById('foodsModal');

            foodsModal.addEventListener('wheel', (e) => {
                const delta = e.deltaY;
                const atTop = foodsModal.scrollTop === 0;
                const atBottom = foodsModal.scrollHeight - modal.scrollTop === modal.clientHeight;

                if ((delta < 0 && atTop) || (delta > 0 && atBottom)) {
                    e.preventDefault();
                }

            }, { passive: false });
        });

    });




// 50音順のひらがなを表示
const kanaBoard = document.getElementById('kanaBoard');
kanaBoard.style.display ='flex';
kanaBoard.style.flexDirection = 'row-reverse';

    const isMobile = window.matchMedia('(max-width: 480px)').matches;
    kanaList.forEach((column, colIndex) => {
        const colDiv = document.createElement('div');
        colDiv.style.display = 'flex';
        colDiv.style.flexDirection = 'column';

        column.forEach(kana => {
            const span = document.createElement('span');
            
            span.textContent = kana;
            span.classList.add('kana')
            span.setAttribute('data-char', kana);
            colDiv.appendChild(span);
        });


        if (isMobile && colIndex === 10) {
            const lineBreak = document.createElement('div');
            lineBreak.style.flexBasis = '100%';
            lineBreak.style.height = '0px';
            kanaBoard.appendChild(lineBreak);
        }

        kanaBoard.appendChild(colDiv);
    });

    // 削除ボタン
    const delCol = document.createElement('div');
    delCol.style.display = 'flex';
    delCol.style.flexDirection = 'clumn';

    const delBtn = document.createElement('span');
    delBtn.textContent = '⌫';
    delBtn.classList.add('kana');
    delBtn.setAttribute('data-char', 'DEL');

    delCol.append(delBtn);
    kanaBoard.appendChild(delCol);

// キーボードから入力できるように
document.querySelectorAll('.kana').forEach(span => {
    span.addEventListener('click', () => {
        const char = span.dataset.char;
        const input = document.getElementById('wordInput');

        // ⌫は削除、'  'は何も起きない、文字は反映
        if(char === 'DEL') {
            input.value = input.value.slice(0, -1);
        }else if (char === '  ') {
            return
        } else if(input.value.length < WORD_LENGTH) {
            input.value += char;
        };
    });
});





