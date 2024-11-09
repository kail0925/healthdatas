// 탭 전환 함수
function openTab(tab) {
    const tabs = document.querySelectorAll('.tab-content');
    const links = document.querySelectorAll('.tab-link');
    
    tabs.forEach(t => t.classList.remove('active'));
    links.forEach(link => link.classList.remove('active'));

    document.getElementById(tab).classList.add('active');
    document.querySelector(`.tab-link[href="#${tab}"]`).classList.add('active');
}

// 운동 기록 추가 함수
const exerciseForm = document.getElementById('exerciseForm');
const exerciseList = document.getElementById('exerciseList');
const exerciseChartContainer = document.getElementById('exerciseChart');

exerciseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const exerciseType = document.getElementById('exerciseSelect').value;
    const otherExercise = document.getElementById('otherExercise').value;
    const hours = document.getElementById('hoursInput').value;
    const minutes = document.getElementById('minutesInput').value;
    const date = document.getElementById('exerciseDate').value;
    
    const exerciseEntry = document.createElement('li');
    exerciseEntry.textContent = `${exerciseType === "13. 기타" ? otherExercise : exerciseType} - ${hours}시간 ${minutes}분 - ${date}`;
    exerciseList.appendChild(exerciseEntry);

    updateExerciseChart(); // 차트 업데이트
});

// 식단 기록 추가 함수
const dietForm = document.getElementById('dietForm');
const dietList = document.getElementById('dietList');
const dietChartContainer = document.getElementById('dietChart');

dietForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const food = document.getElementById('foodSelect').value;
    const otherFood = document.getElementById('otherFood').value;
    const calories = document.getElementById('calories').value;
    const mealDate = document.getElementById('mealDate').value;

    // 칼로리 값이 음수인지 확인
    if (parseInt(calories) < 0 || isNaN(calories) || calories === "") {
        alert("칼로리를 다시 확인하여주세요. 칼로리의 값은 음수일 수 없습니다.");
        return; // 음수일 경우, 추가되지 않는 코드
    }

    const foodEntry = document.createElement('li');
    foodEntry.textContent = `${food === "7. 기타" ? otherFood : food} - ${calories} 칼로리 - ${mealDate}`;
    dietList.appendChild(foodEntry);

    updateDietChart(); // 차트 업데이트
});

// 운동 차트 업데이트
const exerciseData = {
    labels: [],
    datasets: [{
        label: '운동 시간 (시간)',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false
    }]
};

const exerciseChart = new Chart(exerciseChartContainer, {
    type: 'line',
    data: exerciseData
});

function updateExerciseChart() {
    const date = document.getElementById('exerciseDate').value;
    const hours = document.getElementById('hoursInput').value;
    const minutes = document.getElementById('minutesInput').value;
    
    if (date && hours && minutes) {
        const existingIndex = exerciseData.labels.indexOf(date);
        
        if (existingIndex === -1) {
            exerciseData.labels.push(date);
            exerciseData.datasets[0].data.push(parseInt(hours) + parseInt(minutes) / 60);
        } else {
            exerciseData.datasets[0].data[existingIndex] += parseInt(hours) + parseInt(minutes) / 60;
        }
        
        exerciseChart.update();
    }
}

// 식단 차트 업데이트
const dietData = {
    labels: [],
    datasets: [{
        label: '칼로리 (Kcal)',
        data: [],
        backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7',
            'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        tension: 0.1,
        fill: false
    }]
};

const dietChart = new Chart(dietChartContainer, {
    type: 'pie',
    data: dietData
});

function updateDietChart() {
    const mealDate = document.getElementById('mealDate').value;
    const calories = document.getElementById('calories').value;
    
    if (mealDate && calories) {
        const existingIndex = dietData.labels.indexOf(mealDate);
        
        if (existingIndex === -1) {
            dietData.labels.push(mealDate);
            dietData.datasets[0].data.push(parseInt(calories));
        } else {
            dietData.datasets[0].data[existingIndex] += parseInt(calories);
        }
        
        dietChart.update();
    }
}

// 기타 운동/음식 입력 표시
function toggleOtherFoodInput() {
    const foodSelect = document.getElementById('foodSelect');
    const otherFoodInput = document.getElementById('otherFood');
    if (foodSelect.value === "7. 기타") {
        otherFoodInput.style.display = "block";
    } else {
        otherFoodInput.style.display = "none";
    }
}

function toggleOtherExerciseInput() {
    const exerciseSelect = document.getElementById('exerciseSelect');
    const otherExerciseInput = document.getElementById('otherExercise');
    if (exerciseSelect.value === "13. 기타") {
        otherExerciseInput.style.display = "block";
    } else {
        otherExerciseInput.style.display = "none";
    }
}

// 운동 초기화 함수
function resetExerciseData() {
    document.getElementById('exerciseForm').reset();
    document.getElementById('otherExercise').style.display = "none";
}

// 식단 초기화 함수
function resetDietData() {
    document.getElementById('dietForm').reset();
    document.getElementById('otherFood').style.display = "none";
}