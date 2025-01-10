dayjs.extend(window.dayjs_plugin_duration);
// Khởi tạo thời gian đích
const targetDate = dayjs('2025-01-12T00:00:00'); // Thay đổi thành ngày bạn muốn
const overlay = document.getElementById('overlay');
const countdown = document.querySelector('.countdown');

// Hàm cập nhật đếm ngược
function updateCountdown() {
    const now = dayjs();
    const diff = targetDate.diff(now);

    if (diff <= 0) {
        // Đã đến thời gian mở khóa
        overlay.classList.add('hidden');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500)
    } else {
        // Hiển thị thời gian còn lại
        const duration = dayjs.duration(diff);
        const days = String(Math.floor(duration.asDays())).padStart(2, '0');
        const hours = String(duration.hours()).padStart(2, '0');
        const minutes = String(duration.minutes()).padStart(2, '0');
        const seconds = String(duration.seconds()).padStart(2, '0');
        countdown.textContent = `${days}d ${hours} : ${minutes} : ${seconds} `;
    }
}

// Cập nhật đếm ngược mỗi giây
const interval = setInterval(() => {
    updateCountdown();
    if (overlay.classList.contains('hidden')) {
        clearInterval(interval);
    }
}, 1000);

// Chạy hàm lần đầu
updateCountdown();

//kiểm tra hỗ trợ backdrop-fillter
const supportsBackdropFillter = CSS.supports('backdrop-fillter', 'blur(50px') ||
    CSS.supports('-webkit-backdrop-fillter', 'blur(50px)');
if (!supportsBackdropFillter) {
    overlay.classList.add('fallback');
}

const card = document.getElementById('card')
const tapHint = document.getElementById('tap-hint')
let id;
const button = document.getElementById('muteaudio');
const musicOn = '<i class="fas fa-volume-high"></i>';
const musicOff = '<i class="fas fa-volume-xmark"></i>';
let lastIndex = -1; // Lưu chỉ mục tin nhắn trước đó
let messagelist = [];
// const messagelist = [
//     "Count your life by smiles, not tears. Count your age by friends, not years.",
//     "I hope all your birthday wishes and dreams come true.",
//     "May the joy that you have spread in the past come back to you on this day.",
//     "Your life is just about to pick up speed and blast off into the stratosphere. Wear a seat belt and be sure to enjoy the journey.",
//     "Forget the past; look forward to the future, for the best things are yet to come.",
//     "You’re older today than yesterday but younger than tomorrow!",
//     "Don’t get all weird about getting older! Our age is merely the number of years the world has been enjoying us!",
//     "You are only young once, but you can be immature for a lifetime."
// ];
const muteSound = new Howl({
    src: ['./audio/Romantic-Happy-Birthday.mp3'],
    // mute: false,
    // autoplay:true,
    loop: true,
    html5: true,
    volume: 1
});
muteSound.autoUnlock = false;
// Hàm đọc file .txt và chuyển nội dung thành mảng
// Hàm tải danh sách câu chúc từ file JSON
async function loadMessages() {
    try {
        const response = await fetch('js/messages.json'); // Đường dẫn tới file JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        messagelist = await response.json(); // Parse JSON thành mảng
        console.log('Danh sách câu chúc đã tải thành công:', messagelist);
    } catch (error) {
        console.error('Lỗi khi tải danh sách câu chúc:', error.message);
    }
}

// Hàm lấy số ngẫu nhiên sử dụng crypto
function getSecureRandomIndex(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max; // Lấy phần dư để đảm bảo trong khoảng 0 đến max - 1
}

// Sự kiện lật thiệp
card.addEventListener('click', function(e) {
    e.preventDefault();
    $('html, body').css({ overflow: 'hidden' }); // Vô hiệu hóa cuộn khi lật thiệp
    card.classList.toggle('flipped'); // Lật thiệp

    // Kiểm tra nếu đang ở mặt sau (lớp "flipped" được thêm vào)
    if (card.classList.contains('flipped')) {
        setTimeout(() => {
            if (messagelist.length === 0) {
                console.error('Danh sách câu chúc trống hoặc chưa được tải.');
                return;
            }

            // Chọn câu chúc ngẫu nhiên
            let random;
            do {
                random = getSecureRandomIndex(messagelist.length);
            } while (random === lastIndex); // Đảm bảo không lặp lại liên tiếp

            lastIndex = random; // Cập nhật chỉ mục mới
            const message = messagelist[random];

            // Xóa nội dung cũ trước khi hiển thị câu chúc mới
            const messageContainer = document.querySelector('.greeting-content');
            if (messageContainer) {
                messageContainer.innerHTML = ''; // Xóa nội dung cũ
            }

            // Hiển thị câu chúc mới
            new Typed('.greeting-content', {
                strings: [message],
                typeSpeed: 40,
                showCursor: false
            });
        }, 600); // Thời gian trễ để khớp với hiệu ứng lật
    }
});

// Tải danh sách câu chúc khi trang được tải
loadMessages();
// play music once tim flip card
card.addEventListener('click', playsongbirthday, { once: true });

function playsongbirthday() {
    muteSound.play();
}


// mute/unmute
button.addEventListener("click", () => {
    // if the audio is muted, set the btn.innerHTML to unmuteIcon
    // otherwise, set it to the muteIcon
    if (muteSound.muted) {
        button.innerHTML = musicOn;
        muteSound.mute(false);
    } else {
        button.innerHTML = musicOff;
        muteSound.mute(true);
    }
    // toggle the muted property of the audio element
    muteSound.muted = !muteSound.muted;
});