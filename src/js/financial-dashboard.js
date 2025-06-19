// Monthly Cash Flow Forecast
new Chart(document.getElementById("cashFlowChart"), {
    type: "line",
    data: {
      labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
      datasets: [{
        label: "Cash Flow",
        data: [25000, 30000, 37000, 42000, 39000, 37500],
        borderColor: "#24B47E",
        fill: false,
        tension: 0.3
      }]
    }
  });
  

const ctx = document.getElementById("netSalesDayChart").getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, "#024023");   
gradient.addColorStop(1, "#1DE5AC");   

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [{
      label: "Net Sales",
      data: [10000, 15000, 22000, 18000, 24000, 28000, 13000],
      backgroundColor: gradient,
      borderRadius: {
        topLeft: 12,
        topRight: 12
      },
      borderSkipped: false,
      barThickness: 30
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#94A3B8", 
          font: {
            weight: "500"
          }
        }
      },
      y: {
        display: false
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  }
});

const timeCtx = document.getElementById("netSalesTimeChart").getContext("2d");

const timeGradient = timeCtx.createLinearGradient(0, 0, 0, 400);
timeGradient.addColorStop(0, "#024023");
timeGradient.addColorStop(1, "#1DE5AC");

new Chart(timeCtx, {
  type: "bar",
  data: {
    labels: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM", "11PM"],
    datasets: [{
      label: "Net Sales",
      data: [4000, 2500, 6000, 11000, 9500, 12000, 3000],
      backgroundColor: timeGradient,
      borderRadius: {
        topLeft: 12,
        topRight: 12
      },
      borderSkipped: false,
      barThickness: 30
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#94A3B8",
          font: {
            weight: "500"
          }
        }
      },
      y: {
        grid: {
          color: "#F1F5F9"
        },
        ticks: {
          color: "#64748B"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  }
});

const profitCtx = document.getElementById("profitMarginChart").getContext("2d");

  const grossGradient = profitCtx.createLinearGradient(0, 0, 0, 300);
  grossGradient.addColorStop(0, "#024023");
  grossGradient.addColorStop(1, "#5DB79E");
  
  const netColor = "#E2E8F0"; 
  
  new Chart(profitCtx, {
    type: "doughnut",
    data: {
      labels: ["Gross Margin", "Net Margin"],
      datasets: [{
        data: [65, 35],
        backgroundColor: [grossGradient, netColor],
        borderWidth: 0,
        borderRadius: 10
      }]
    },
    options: {
      cutout: "70%",
      radius: "80%",
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            color: "#1B2559",
            usePointStyle: true,
            pointStyle: "circle",
            font: {
              size: 14,
              weight: "500"
            },
            //padding: 10
          },  
        },
        tooltip: {
          enabled: true
        }
      }
    }
  });

  // Expenses Breakdown by Category
  /*
  new Chart(document.getElementById("expensesBreakdownChart"), {
    type: "bar",
    data: {
      labels: ["Salaries", "Utilities", "Marketing", "Rent", "Other"],
      datasets: [{
        label: "Expense %",
        data: [40, 15, 20, 10, 15],
        backgroundColor: "#F59E0B"
      }]
    }
  });
  */

  /*
  const expenseCtx = document.getElementById("expensesBreakdownChart").getContext("2d");

  const expenseGradient = expenseCtx.createLinearGradient(0, 0, 300, 0);
  expenseGradient.addColorStop(0, "#024023");
  expenseGradient.addColorStop(1, "#5DB79E");
  
  new Chart(expenseCtx, {
    type: "bar",
    data: {
      labels: ["Salaries", "Utilities", "Marketing", "Rent", "Other"],
      datasets: [{
        label: "Expense %",
        data: [40, 15, 20, 10, 15],
        backgroundColor: expenseGradient,
        borderRadius: 50,
        barThickness: 24
      }]
    },
    options: {
      indexAxis: 'y', // This flips the chart to horizontal
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          max: 50, // Adjust based on your highest % value
          grid: {
            display: false
          },
          ticks: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: "#1B2559",
            font: {
              weight: "500"
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: context => `${context.raw}%`
          }
        }
      }
    }
  });
  */









/*
const expenseCtx = document.getElementById("expensesBreakdownChart").getContext("2d");

const expenseGradient = expenseCtx.createLinearGradient(0, 0, 400, 0); // horizontal gradient
expenseGradient.addColorStop(0, "#024023");
expenseGradient.addColorStop(1, "#5DB79E");

new Chart(expenseCtx, {
  type: "bar",
  data: {
    labels: ["Salaries", "Utilitles", "Marketing", "Rent", "Other"],
    datasets: [{
      label: "Expense %",
      data: [40, 15, 20, 10, 15],
      backgroundColor: expenseGradient,
      borderRadius: 20,
      borderSkipped: false,
      barThickness: 28
    }]
  },
  options: {
    indexAxis: 'y', // horizontal bar
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        anchor: 'end',
        align: 'right',
        color: '#1B2559',
        font: {
          weight: '600',
          size: 14
        },
        formatter: (value) => `${value}%`
      }
    }
  },
  plugins: [ChartDataLabels]
});

  */





  
  // Debt-to-Equity Ratio Trend
  /*
  new Chart(document.getElementById("debtToEquityChart"), {
    type: "line",
    data: {
      labels: ["Quartile 1", "Quartile 2", "Quartile 3", "Quartile 4"],
      datasets: [{
        label: "D/E Ratio",
        data: [0.8, 0.7, 0.6, 0.5],
        borderColor: "#F87171",
        fill: false,
        tension: 0.3
      }]
    }
  });
  */
  
  /*
  new Chart(document.getElementById("ratiosAnalysisChart"), {
    type: "bar",
    data: {
      labels: ["Profit Margin", "Current Ratio", "ROI", "Debt/Equity"],
      datasets: [{
        label: "%",
        data: [20, 40, 30, 10],
        backgroundColor: "#34D399"
      }]
    }
  });
*/


  /*
const ratiosCtx = document.getElementById("ratiosAnalysisChart").getContext("2d");

new Chart(ratiosCtx, {
  type: "line",
  data: {
    labels: ["Profit Margin", "Current Ratio", "Return on Investment", "Debt-to-Equity Ratio"],
    datasets: [{
      label: "%",
      data: [20, 40, 30, 10],
      borderColor: "#103C2E",        // dark green line
      backgroundColor: "#103C2E",    // dark green dots
      pointRadius: 10,               // large dots
      pointHoverRadius: 10,
      borderWidth: 4,                // thick line
      fill: false,                   // no area fill
      tension: 0.4                   // optional: smooth curves
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#1B2559", // optional: axis label color
          font: {
            size: 14
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#1B2559"
        },
        grid: {
          color: "#E2E8F0"
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  }
});

*/


const ratiosCtx = document.getElementById("ratiosAnalysisChart").getContext("2d");

new Chart(ratiosCtx, {
  type: "line",
  data: {
    labels: ["Profit Margin", "Current Ratio", "Return on Investment", "Debt-to-Equity Ratio"],
    datasets: [{
      data: [20, 40, 30, 10],
      borderColor: "#113F25",
      backgroundColor: "#113F25",
      borderWidth: 4,
      pointRadius: 10,
      pointBackgroundColor: "#113F25",
      pointBorderColor: "#113F25",
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#334155"
        },
        grid: {
          color: "#E2E8F0"
        }
      },
      x: {
        ticks: {
          color: "#1E293B"
        },
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    }
  }
});

