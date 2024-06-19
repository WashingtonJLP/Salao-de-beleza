function submitForm(formId) {
    var form = document.getElementById(formId);
    var serviceName = form.querySelector('h2').textContent;
    var serviceStyle = form.querySelector('select').value;

    alert("Você escolheu: " + serviceName + " com o estilo " + serviceStyle + ", escolha o dia e horário abaixo:");

    var calendarEl = document.getElementById('calendar');
    var selectedDate = null; 

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        initialView: 'dayGridMonth',
        selectable: true,
        dateClick: function(info) {
            if (selectedDate !== info.dateStr) {  
                document.querySelectorAll('.fc-day-selected').forEach(function(date) {
                    date.classList.remove('fc-day-selected');
                });
                info.dayEl.classList.add('fc-day-selected');
                selectedDate = info.dateStr; 

                document.getElementById('periodLabel').style.display = 'block';
                document.getElementById('periodSelect').style.display = 'block';
                document.getElementById('timeLabel').style.display = 'block';
                document.getElementById('timeSelect').style.display = 'block';
                document.getElementById('confirmBtn').style.display = 'block';

                document.getElementById('periodSelect').dispatchEvent(new Event('change'));
            }
        }
    });
    calendar.render();
    
    document.getElementById('confirmBtn').addEventListener('click', function() {
        alert('Agendamento feito com sucesso!');
    });
}

document.getElementById('periodSelect').addEventListener('change', function() {
    var period = this.value;
    var timeSelect = document.getElementById('timeSelect');
    timeSelect.innerHTML = ''; 

    var times = period === 'morning' ? ['08:00', '09:00', '10:00', '11:00'] : ['13:00', '14:00', '15:00', '16:00'];
    times.forEach(function(time) {
        var option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
});
