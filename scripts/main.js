import { check as checkOS } from './os.js';
import { check as checkBrowser } from './browser.js';

const ua = navigator.userAgent;
// const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15'
// const ua = 'Mozilla/5.0 (iPad; CPU OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/15E148 Safari/604.1'

document.getElementById('ua').innerHTML = ua;

const osResult = checkOS(ua);
const browserResult = checkBrowser(ua);

display('os', osResult);
display('browser', browserResult);

function display(parent, data)
{
    const container = document.getElementById(parent);

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const i in data)
    {
        const row = document.createElement('tr');
        const cell0 = document.createElement('td');
        const cell1 = document.createElement('td');

        cell0.textContent = i;
        cell1.textContent = data[i];
        
        if (data[i] == true)
        {
            cell0.classList.add('bold');
            cell1.classList.add('bold');
        }

        row.appendChild(cell0);
        row.appendChild(cell1);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    container.appendChild(table);
}
