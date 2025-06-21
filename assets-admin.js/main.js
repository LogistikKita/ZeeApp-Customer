// File: /assets-admin/js/main.js document.getElementById('toggleBtn').addEventListener('click', () => { const sidebar = document.getElementById('sidebar'); const logoText = document.getElementById('logo-text'); const labels = document.querySelectorAll('.menu-item .label');

if (sidebar.classList.contains('md:w-64')) { sidebar.classList.remove('md:w-64'); sidebar.classList.add('md:w-20'); logoText.classList.add('hidden'); labels.forEach(label => label.classList.add('hidden')); } else { sidebar.classList.remove('md:w-20'); sidebar.classList.add('md:w-64'); logoText.classList.remove('hidden'); labels.forEach(label => label.classList.remove('hidden')); } });

