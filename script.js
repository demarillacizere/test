const repositories = [
    'demarillacizere/dice-game',
    // Add more repository names as needed
  ];
  
  const chartsContainer = document.getElementById('charts-container');
  
  repositories.forEach(repo => {
    fetch(`https://api.github.com/repos/${repo}/issues/1`)
      .then(response => response.json())
      .then(data => {
        const completedTasks = (data.body.match(/- \[x\]/g) || []).length;
        const uncompletedTasks = (data.body.match(/- \[ \]/g) || []).length;
        const totalTasks = completedTasks + uncompletedTasks;
        const completedPercentage = (completedTasks / totalTasks) * 100;
        const uncompletedPercentage = (uncompletedTasks / totalTasks) * 100;
  
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const chartContainer = document.createElement('div');
        chartContainer.classList.add('chart-container');
  
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Completed', 'Uncompleted'],
            datasets: [{
              data: [completedPercentage, uncompletedPercentage],
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(192, 75, 75, 0.2)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            cutout: '80%', // Adjust the cutout size as needed
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  usePointStyle: true
                }
              }
            }
          }
        });
  
        chartContainer.appendChild(canvas);
        chartsContainer.appendChild(chartContainer);
      });
  });
  