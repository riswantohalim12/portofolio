const ctx = document.getElementById('salesChart').getContext('2d');

const salesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Januari', 'Februari', 'Maret', 'April', 
            'Mei', 'Juni', 'Juli', 'Agustus', 
            'September', 'Oktober', 'November', 'Desember'
        ],
        datasets: [
            {
                label: '2022',
                data: [4017, 4136, 7091, 7555, 5481, 5467, 7130, 6133, 3995, 2897, 5235, 5472],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: '2023',
                data: [6135, 7416, 5841, 5841, 6547, 3467, 6343, 9340, 2977, 8879, 5435, 889],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});