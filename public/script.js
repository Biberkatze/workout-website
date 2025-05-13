document.getElementById("tracker-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      date: form.date.value,
      exercise: form.exercise.value,
      weight: parseFloat(form.weight.value),
      reps: parseInt(form.reps.value)
    };
    await fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    location.reload();
  });
  
  window.onload = async () => {
    const res = await fetch("/data");
    const allData = await res.json();
  
    const benchData = allData.filter(d => d.exercise.toLowerCase() === "bench press");
  
    const labels = benchData.map(d => d.date);
    const weights = benchData.map(d => d.weight);
  
    new Chart(document.getElementById("progressChart"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Bench Press (kg)",
          data: weights,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  };
  