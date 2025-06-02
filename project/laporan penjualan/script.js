document.addEventListener('DOMContentLoaded', function () {
    const salesTable = document.getElementById('salesDataTable');
    const tableRows = salesTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    const monthLabels = [
        'Januari', 'Februari', 'Maret', 'April',
        'Mei', 'Juni', 'Juli', 'Agustus',
        'September', 'Oktober', 'November', 'Desember'
    ];

    const datasets = [];
    const backgroundColors = [
        'rgba(255, 99, 132, 0.6)',  // Merah muda untuk 2022
        'rgba(54, 162, 235, 0.6)', // Biru untuk 2023
        'rgba(255, 206, 86, 0.6)', // Kuning untuk tahun berikutnya
        'rgba(75, 192, 192, 0.6)', // Teal untuk tahun berikutnya
        'rgba(153, 102, 255, 0.6)',// Ungu untuk tahun berikutnya
        'rgba(255, 159, 64, 0.6)'  // Oranye untuk tahun berikutnya
    ];
    const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    for (let i = 0; i < tableRows.length; i++) {
        const cells = tableRows[i].getElementsByTagName('td');
        const yearLabel = cells[0].innerText;
        const salesData = [];
        for (let j = 1; j < cells.length; j++) { // Mulai dari j=1 untuk melewati kolom tahun
            salesData.push(parseInt(cells[j].innerText));
        }
        datasets.push({
            label: yearLabel,
            data: salesData,
            backgroundColor: backgroundColors[i % backgroundColors.length], // Gunakan modulo untuk siklus warna jika data > warna
            borderColor: borderColors[i % borderColors.length],
            borderWidth: 1,
            tension: 0.1 // Sedikit melengkungkan garis jika tipe chart 'line'
        });
    }

    const ctx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(ctx, {
        type: 'bar', // Bisa diganti menjadi 'line' jika diinginkan
        data: {
            labels: monthLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Penting untuk canvas custom size
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Jumlah Penjualan'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Bulan'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Grafik Penjualan Bulanan',
                    font: {
                        size: 18
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('id-ID').format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
});
