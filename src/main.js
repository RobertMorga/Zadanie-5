import './style.css'
import dayjs from 'dayjs'

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('birthdayForm');
    const dialog = document.getElementById('resultDialog');
    const closeDialogBtn = document.getElementById('closeDialog');
    const dialogContent = document.getElementById('dialogContent');

    if (!form || !dialog || !closeDialogBtn || !dialogContent) {
        console.error("BLAD: Nie znaleziono elementow w HTML. Upewnij sie, ze masz poprawne ID w index.html!");
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const birthdateInput = document.getElementById('birthdate').value;
        if (!birthdateInput) return;

        const today = dayjs();
        const birthdate = dayjs(birthdateInput);

        const daysSinceBirth = today.diff(birthdate, 'days');

        const isBirthdayToday = today.month() === birthdate.month() && today.date() === birthdate.date();

        if (isBirthdayToday) {
            alert("Wszystkiego najlepszego!");
        }

        let nextBirthday = birthdate.year(today.year());

        if (nextBirthday.isBefore(today, 'day')) {
            nextBirthday = nextBirthday.add(1, 'year');
        }

        const daysUntilBirthday = nextBirthday.diff(today, 'days');
        const weeksUntilBirthday = Math.floor(daysUntilBirthday / 7);

        let htmlContent = `<p class="font-semibold">Od Twoich narodzin minelo: ${daysSinceBirth} dni.</p>`;

        if (!isBirthdayToday) {
            if (daysUntilBirthday > 0 && daysUntilBirthday <= 7) {
                htmlContent += `<p class="font-bold mt-2">Masz urodziny w tym tygodniu!</p>`;
            } else {
                htmlContent += `<p class="mt-2">Do Twoich kolejnych urodzin pozostalo tygodni: ${weeksUntilBirthday}</p>`;
            }
        }

        dialogContent.innerHTML = htmlContent;
        dialog.showModal();
    });

    closeDialogBtn.addEventListener('click', () => {
        dialog.close();
    });

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });

});