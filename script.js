let allPatientData = [];
let currentIndex = null;

const credentials = btoa('coalition:skills-test');
const url = 'https://fedskillstest.coalitiontechnologies.workers.dev';

const patientHistory = document.querySelector('.patient-history');
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.btn-close');
const modal = document.querySelector('.modal');
const diagHistoryTitle = document.querySelector('.history-heading');
const chartContainer = document.querySelector('.chart-container-grp');
const options = document.querySelector('.options');

const patientsContainer = document.querySelector('.patients-container');
const ctx = document.getElementById('chart');

const patientInfo = document.querySelector('.patient-info');
const labInfo = document.querySelector('.lab-results');
const patientDiagList = document.querySelector('.patient-diagnostic-list');
const div = document.createElement('div');

const rateCards = document.querySelector('.rate-cards');

let singleUser;
let diagnosisHistorychart;

//SVGs

const arrowDownSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="9.999" height="5.479" viewBox="0 0 9.999 5.479">
  <path id="ArrowDown" d="M333.518-544.8l-4.177-4.178a.673.673,0,0,1-.136-.193.532.532,0,0,1-.05-.228.606.606,0,0,1,.165-.424.56.56,0,0,1,.434-.18h8.8a.56.56,0,0,1,.434.181.611.611,0,0,1,.165.423,1.85,1.85,0,0,1-.186.421l-4.177,4.177a.962.962,0,0,1-.3.21.851.851,0,0,1-.338.066.851.851,0,0,1-.339-.066A.963.963,0,0,1,333.518-544.8Z" transform="translate(-329.155 549.999)" fill="#072635"/>
</svg>`;

const arrowUpSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="5.479" viewBox="0 0 10 5.479">
  <path id="ArrowUp" d="M4.364,5.2.186,1.024A.673.673,0,0,1,.05.832.532.532,0,0,1,0,.6.606.606,0,0,1,.165.18.56.56,0,0,1,.6,0H9.4a.56.56,0,0,1,.434.181A.611.611,0,0,1,10,.6a1.85,1.85,0,0,1-.186.421L5.636,5.2a.962.962,0,0,1-.3.21.9.9,0,0,1-.677,0A.963.963,0,0,1,4.364,5.2Z" transform="translate(10 5.479) rotate(180)" fill="#072635"/>
</svg>`;

const heartSvg = `<svg id="HeartBPM" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_35" data-name="Rectangle 35" width="59.711" height="53.998" fill="none"/>
    </clipPath>
  </defs>
  <circle id="Ellipse_8" data-name="Ellipse 8" cx="48" cy="48" r="48" fill="#fff"/>
  <g id="Health" transform="translate(18.145 24.001)">
    <g id="Group_13" data-name="Group 13" clip-path="url(#clip-path)">
      <path id="Path_16" data-name="Path 16" d="M29.855,54,4.951,29.092a16.948,16.948,0,0,1-1.185-1.314l2.01-1.632a14.236,14.236,0,0,0,1,1.112L29.854,50.333,52.926,27.258a14.317,14.317,0,0,0,0-20.247l-.233-.235a14.318,14.318,0,0,0-20.248,0l-2.6,2.6-2.59-2.6A14.337,14.337,0,0,0,7,6.776l-.229.23a14.226,14.226,0,0,0-4.19,10.127H0A16.8,16.8,0,0,1,4.951,5.181l.23-.229a16.925,16.925,0,0,1,23.914,0l.761.761.761-.761a16.906,16.906,0,0,1,23.909,0h0l.233.234a16.906,16.906,0,0,1,0,23.908Z" transform="translate(0 0)" fill="#072635"/>
      <path id="Path_17" data-name="Path 17" d="M8.763,25.277A11.53,11.53,0,0,1,8.763,9l.227-.226a11.513,11.513,0,0,1,16.282,0h0l4.573,4.582,4.582-4.585a11.513,11.513,0,0,1,16.282,0l.212.214a11.509,11.509,0,0,1,.038,16.276l-.021.022L29.855,46.368Z" transform="translate(0 0)" fill="#f05b66"/>
      <path id="Path_18" data-name="Path 18" d="M20.131,30.786l-4.24-13.852-2.785,6.335L.028,23.161V20.573l11.389.108,4.91-11.17,4.466,14.594,2.241-4.154h17.6v2.588H24.578Z" transform="translate(0 0)" fill="#072635"/>
    </g>
  </g>
</svg>`;

const respiratorySvg = `<svg id="respiratory_rate" data-name="respiratory rate" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_37" data-name="Rectangle 37" width="53.378" height="56.499" fill="none"/>
    </clipPath>
  </defs>
  <circle id="Ellipse_8" data-name="Ellipse 8" cx="48" cy="48" r="48" fill="#fff"/>
  <g id="Group_15" data-name="Group 15" transform="translate(21.311 19.75)">
    <g id="Group_14" data-name="Group 14" clip-path="url(#clip-path)">
      <path id="Path_19" data-name="Path 19" d="M20.783,56.5,6.826,56.468a8.013,8.013,0,0,1-5.191-3.652c-2.027-3.294-2.17-8.5-.427-15.474,4.17-16.681,10.165-22.955,12.549-24.878a8.794,8.794,0,0,1,6.385-2.231l-.367,2.473.184-1.236-.168,1.238a6.431,6.431,0,0,0-4.465,1.7C13.138,16.175,7.62,22,3.634,37.947c-1.552,6.209-1.507,10.9.13,13.56A5.474,5.474,0,0,0,7.248,54H20.783a2.149,2.149,0,0,0,2.146-2.146V29.931h2.5V51.853A4.651,4.651,0,0,1,20.783,56.5" transform="translate(0 0)" fill="#072635"/>
      <path id="Path_20" data-name="Path 20" d="M46.415,56.5H32.6a4.651,4.651,0,0,1-4.646-4.646V29.931h2.5V51.853A2.149,2.149,0,0,0,32.6,54H46.13a5.472,5.472,0,0,0,3.483-2.492c1.638-2.661,1.684-7.35.131-13.56C45.758,22,40.239,16.175,38.051,14.41a6.479,6.479,0,0,0-4.449-1.7l-.367-2.473a8.805,8.805,0,0,1,6.386,2.231c2.384,1.923,8.379,8.2,12.549,24.878,1.743,6.974,1.6,12.181-.427,15.474a8.015,8.015,0,0,1-5.191,3.652Z" transform="translate(0 0)" fill="#072635"/>
      <path id="Path_21" data-name="Path 21" d="M20.767,26.415l-.429-2.463c.127-.026,3.514-.793,3.514-6.812V2.5h-.728V0h3.228V17.14c0,8.21-5.357,9.235-5.585,9.275" transform="translate(0 0)" fill="#072635"/>
      <path id="Path_22" data-name="Path 22" d="M32.774,26.415c-.229-.04-5.586-1.065-5.586-9.275V0h3.229V2.5h-.729V17.14c0,6.13,3.479,6.806,3.514,6.812Z" transform="translate(0 0)" fill="#072635"/>
      <path id="Path_23" data-name="Path 23" d="M21.255,31.084l-1.715-1.03c.1-.171,2.564-4.2,7.191-4.2s7.023,4.04,7.123,4.211l-1.731,1a6.721,6.721,0,0,0-5.392-3.214c-3.476,0-5.456,3.195-5.476,3.228" transform="translate(0 0)" fill="#072635"/>
      <path id="Path_24" data-name="Path 24" d="M21.739,16.348v33.9a2.476,2.476,0,0,1-2.477,2.476H8.487s-6.066.22-4.55-9.538,7.648-24.526,11.934-26.834,5.538-.659,5.868,0" transform="translate(0 0)" fill="#74cef5"/>
      <path id="Path_25" data-name="Path 25" d="M31.644,16.348v33.9a2.476,2.476,0,0,0,2.477,2.476H44.9s6.066.22,4.55-9.538S41.8,18.656,37.512,16.348s-5.538-.659-5.868,0" transform="translate(0 0)" fill="#74cef5"/>
    </g>
  </g>
</svg>
`;

const temperatureSvg = `<svg id="temperature" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_45" data-name="Rectangle 45" width="31.632" height="56" fill="none"/>
    </clipPath>
  </defs>
  <circle id="Ellipse_8" data-name="Ellipse 8" cx="48" cy="48" r="48" fill="#fff"/>
  <g id="Group_17" data-name="Group 17" transform="translate(32 20)">
    <g id="Group_16" data-name="Group 16" clip-path="url(#clip-path)">
      <path id="Path_26" data-name="Path 26" d="M13.707,56A13.706,13.706,0,0,1,7.474,30.086V0H19.941V30.086A13.706,13.706,0,0,1,13.707,56M9.474,2V31.359l-.588.266a11.708,11.708,0,1,0,9.643,0l-.588-.266V2Z"/>
      <rect id="Rectangle_38" data-name="Rectangle 38" width="5.025" height="44.411" transform="translate(11.195 3.921)" fill="#f05b66"/>
      <path id="Path_27" data-name="Path 27" d="M23.3,42.529a9.6,9.6,0,1,1-9.6-9.6,9.6,9.6,0,0,1,9.6,9.6" fill="#f05b66"/>
      <rect id="Rectangle_39" data-name="Rectangle 39" width="6.471" height="2" transform="translate(23.161 0.118)"/>
      <rect id="Rectangle_40" data-name="Rectangle 40" width="8.471" height="2" transform="translate(23.161 5.365)"/>
      <rect id="Rectangle_41" data-name="Rectangle 41" width="6.471" height="2" transform="translate(23.161 26.353)"/>
      <rect id="Rectangle_42" data-name="Rectangle 42" width="6.471" height="2" transform="translate(23.161 10.612)"/>
      <rect id="Rectangle_43" data-name="Rectangle 43" width="6.471" height="2" transform="translate(23.161 21.106)"/>
      <rect id="Rectangle_44" data-name="Rectangle 44" width="8.471" height="2" transform="translate(23.161 15.859)"/>
    </g>
  </g>
</svg>
`;

// Helper functions for Chartjs custom legends
const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);
    const [sysBp, diasBp] = options.bpResults;

    const latestSys = [...sysBp].reverse()[0];
    const latestDias = [...diasBp].reverse()[0];

    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement('li');

      const boxSpan = document.createElement('span');
      boxSpan.classList.add('box');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';

      boxSpan.style.marginRight = '10px';

      const resultDescriptionContainer = document.createElement('p');
      const valueContainer = document.createElement('p');
      valueContainer.classList.add('value');
      let levelContainer = document.createElement('p');
      levelContainer.classList.add('level');
      const boxContainer = document.createElement('div');
      boxContainer.classList.add('box-description');
      const valueAndLevelContainer = document.createElement('div');

      resultDescriptionContainer.style.color = item.fontColor;

      const resultDescription = document.createTextNode(item.text);
      const resultValue = document.createTextNode(
        item.text.toLowerCase() === 'systolis'
          ? latestSys.value
          : latestDias.value
      );

      levelContainer.innerHTML =
        item.text.toLowerCase() === 'systolis'
          ? `
       ${
         latestSys.levels.toLowerCase().includes('higher')
           ? arrowUpSvg
           : latestSys.levels.includes('lower')
           ? arrowDownSvg
           : ''
       }
       <span>${latestSys.levels}</span>
     `
          : item.text.toLowerCase() === 'diastolic'
          ? `
       <span>${
         latestDias.levels.toLowerCase().includes('higher')
           ? arrowUpSvg
           : latestDias.levels.toLowerCase().includes('lower')
           ? arrowDownSvg
           : ''
       }</span>
       <span>${latestDias.levels}</span>
     `
          : '';

      resultDescriptionContainer.appendChild(resultDescription);
      valueContainer.appendChild(resultValue);

      boxContainer.appendChild(boxSpan);
      boxContainer.appendChild(resultDescriptionContainer);
      valueAndLevelContainer.appendChild(valueContainer);
      valueAndLevelContainer.appendChild(levelContainer);

      li.appendChild(boxContainer);
      li.appendChild(valueAndLevelContainer);

      ul.appendChild(li);
    });
  },
};

// Helper function for retrieving Respiratory, temperature and heart beat rates
const getDiagnosisRates = (recentHistory) => {
  const rates = recentHistory.map((data) => {
    const respiratory = data.respiratory_rate;
    const temperature = data.temperature;
    const heartRate = data.heart_rate;
    return { respiratory, temperature, heartRate };
  });
  return rates;
};

// Helper function for creating Respiratory, temperature and heart beat cards
function createRateCard(rate, cardClass, innerText, unit, svgIcon) {
  const respiratoryDiv = document.createElement('div');
  respiratoryDiv.classList.add(cardClass);
  const svg = document.createElement('p');
  svg.classList.add('svg');
  const text = document.createElement('p');
  text.classList.add('rate-text');
  const value = document.createElement('p');
  value.classList.add('rate-value');
  const levelDiv = document.createElement('div');
  levelDiv.classList.add('rate-level');
  const level = document.createElement('p');

  svg.innerHTML = svgIcon;
  text.innerText = innerText;
  value.innerText = rate.value + ' ' + unit;
  levelDiv.innerHTML = rate.levels.toLowerCase().includes('higher')
    ? arrowUpSvg
    : rate.levels.toLowerCase().includes('lower')
    ? arrowDownSvg
    : '';
  level.innerText = rate.levels;

  levelDiv.appendChild(level);

  respiratoryDiv.appendChild(svg);
  respiratoryDiv.appendChild(text);
  respiratoryDiv.appendChild(value);
  respiratoryDiv.appendChild(levelDiv);

  rateCards.appendChild(respiratoryDiv);
}

//Helper function for Creating Diagnosis table
const diagListTable = (data) => {
  const heading = document.createElement('h2');
  const tableDiv = document.createElement('div');
  tableDiv.classList.add('table-container');
  tableDiv.classList.add('scroll');
  const diagnosticTable = document.createElement('table');

  const diagnosticTableHead = document.createElement('thead');
  const diagnosticTableBody = document.createElement('tbody');
  const diagnosticTableRowHead = document.createElement('tr');

  const td = document.createElement('th');
  const td2 = document.createElement('th');
  const td3 = document.createElement('th');

  data.forEach(
    (tableData) =>
      (diagnosticTableBody.innerHTML += ` <tr> <td>${tableData.name}</td>
    <td>${tableData.description}</td>
    <td>${tableData.status}</td>
    </tr>
    `)
  );
  heading.innerText = 'Diagnotic list';
  td.innerText = 'Problem/Diagnosis';
  td2.innerText = 'Description';
  td3.innerText = 'Status';

  diagnosticTableRowHead.appendChild(td);
  diagnosticTableRowHead.appendChild(td2);
  diagnosticTableRowHead.appendChild(td3);
  diagnosticTableHead.appendChild(diagnosticTableRowHead);
  diagnosticTable.appendChild(diagnosticTableHead);
  diagnosticTable.appendChild(diagnosticTableBody);

  tableDiv.appendChild(diagnosticTable);

  patientDiagList.appendChild(heading);
  patientDiagList.appendChild(tableDiv);
};

//Helper function for patient Bio data
const getPatientBioData = (userData) => {
  patientInfo.innerHTML = ` 
        
            <img
              src=${userData.profile_picture}
              alt="Profile image of a patient smiling"
              class="info-image"
            />
            <p class="info-name">${userData.name}</p>
            <div class="p-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
              >
                <g id="BirthIcon" transform="translate(-1235 -471)">
                  <circle
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    cx="21"
                    cy="21"
                    r="21"
                    transform="translate(1235 471)"
                    fill="#f6f7f8"
                  />
                  <path
                    id="calendar_today_FILL0_wght300_GRAD0_opsz24"
                    d="M141.892-844.614a1.826,1.826,0,0,1-1.342-.549,1.826,1.826,0,0,1-.549-1.342v-14a1.826,1.826,0,0,1,.549-1.342,1.826,1.826,0,0,1,1.342-.549h1.449v-1.408a.78.78,0,0,1,.23-.574.78.78,0,0,1,.574-.23.779.779,0,0,1,.574.23.779.779,0,0,1,.23.574v1.408h7.928v-1.429a.76.76,0,0,1,.225-.559.759.759,0,0,1,.559-.225.759.759,0,0,1,.559.225.76.76,0,0,1,.225.559v1.429H155.9a1.826,1.826,0,0,1,1.342.549,1.826,1.826,0,0,1,.549,1.342v14a1.826,1.826,0,0,1-.549,1.342,1.826,1.826,0,0,1-1.342.549Zm0-1.569h14a.308.308,0,0,0,.221-.1.308.308,0,0,0,.1-.221v-9.819H141.57v9.819a.308.308,0,0,0,.1.221A.308.308,0,0,0,141.892-846.183Zm-.322-11.71h14.648v-2.616a.308.308,0,0,0-.1-.221.308.308,0,0,0-.221-.1h-14a.308.308,0,0,0-.221.1.308.308,0,0,0-.1.221Zm0,0v0Z"
                    transform="translate(1106.999 1346.614)"
                    fill="#072635"
                  />
                </g>
              </svg>
              <div class="more-info">
                <p>Date of birth</p>
                <p>${userData.date_of_birth}</p>
              </div>
            </div>
            <div class="p-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
              >
                <g id="FemaleIcon" transform="translate(-1235 -471)">
                  <circle
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    cx="21"
                    cy="21"
                    r="21"
                    transform="translate(1235 471)"
                    fill="#f6f7f8"
                  />
                  <path
                    id="female_FILL0_wght300_GRAD0_opsz24"
                    d="M275.456-772.423H273.94a.88.88,0,0,1-.648-.261.88.88,0,0,1-.261-.648.879.879,0,0,1,.261-.648.88.88,0,0,1,.648-.261h1.515v-3.1a6.172,6.172,0,0,1-3.907-2.136,6.214,6.214,0,0,1-1.548-4.19,6.072,6.072,0,0,1,1.861-4.484,6.164,6.164,0,0,1,4.5-1.843,6.164,6.164,0,0,1,4.5,1.843,6.072,6.072,0,0,1,1.861,4.484,6.215,6.215,0,0,1-1.548,4.19,6.172,6.172,0,0,1-3.907,2.136v3.1h1.515a.879.879,0,0,1,.648.261.88.88,0,0,1,.261.648.879.879,0,0,1-.261.648.88.88,0,0,1-.648.261h-1.515v1.515a.879.879,0,0,1-.261.648.88.88,0,0,1-.648.261.879.879,0,0,1-.648-.261.88.88,0,0,1-.261-.648Zm.911-6.667a4.375,4.375,0,0,0,3.214-1.332,4.385,4.385,0,0,0,1.33-3.216,4.375,4.375,0,0,0-1.332-3.214,4.385,4.385,0,0,0-3.216-1.33,4.375,4.375,0,0,0-3.214,1.332,4.385,4.385,0,0,0-1.33,3.216,4.375,4.375,0,0,0,1.332,3.214A4.385,4.385,0,0,0,276.366-779.09Z"
                    transform="translate(979.999 1271.999)"
                    fill="#072635"
                  />
                </g>
              </svg>
              <div class="more-info">
                <p>Gender</p>
                <p>${userData.gender}</p>
              </div>
            </div>
            <div class="p-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
              >
                <g id="PhoneIcon" transform="translate(-1235 -471)">
                  <circle
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    cx="21"
                    cy="21"
                    r="21"
                    transform="translate(1235 471)"
                    fill="#f6f7f8"
                  />
                  <path
                    id="call_FILL0_wght300_GRAD0_opsz24"
                    d="M158.754-800a15.86,15.86,0,0,1-6.682-1.546,21.268,21.268,0,0,1-6.167-4.363,21.421,21.421,0,0,1-4.357-6.167A15.823,15.823,0,0,1,140-818.752a1.214,1.214,0,0,1,.353-.89,1.192,1.192,0,0,1,.882-.356h3.837a1.175,1.175,0,0,1,.786.291,1.279,1.279,0,0,1,.433.718l.674,3.462a1.978,1.978,0,0,1-.029.828,1.231,1.231,0,0,1-.357.581l-2.717,2.645a16.322,16.322,0,0,0,1.5,2.273,22.419,22.419,0,0,0,1.825,2.046,20.311,20.311,0,0,0,2.059,1.8,20.68,20.68,0,0,0,2.355,1.545l2.64-2.663a1.494,1.494,0,0,1,.669-.4,1.922,1.922,0,0,1,.816-.057l3.267.665a1.382,1.382,0,0,1,.727.455,1.16,1.16,0,0,1,.282.765v3.814a1.191,1.191,0,0,1-.356.882A1.214,1.214,0,0,1,158.754-800Zm-15.726-13.145,2.1-2.009a.21.21,0,0,0,.074-.124.275.275,0,0,0-.006-.147l-.511-2.629a.242.242,0,0,0-.079-.136.228.228,0,0,0-.147-.045h-2.516a.154.154,0,0,0-.113.045.153.153,0,0,0-.045.113,15.049,15.049,0,0,0,.395,2.45A14.978,14.978,0,0,0,143.028-813.144Zm10.235,10.167a12.1,12.1,0,0,0,2.44.834,13.842,13.842,0,0,0,2.374.343.153.153,0,0,0,.113-.045.153.153,0,0,0,.045-.113v-2.475a.228.228,0,0,0-.045-.147.242.242,0,0,0-.136-.079l-2.471-.5a.186.186,0,0,0-.119-.006.289.289,0,0,0-.107.074ZM143.028-813.144ZM153.263-802.976Z"
                    transform="translate(1105.999 1301.999)"
                    fill="#072635"
                  />
                </g>
              </svg>

              <div class="more-info">
                <p>Contact info</p>
                <p>${userData.phone_number}</p>
              </div>
            </div>
            <div class="p-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
              >
                <g id="PhoneIcon" transform="translate(-1235 -471)">
                  <circle
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    cx="21"
                    cy="21"
                    r="21"
                    transform="translate(1235 471)"
                    fill="#f6f7f8"
                  />
                  <path
                    id="call_FILL0_wght300_GRAD0_opsz24"
                    d="M158.754-800a15.86,15.86,0,0,1-6.682-1.546,21.268,21.268,0,0,1-6.167-4.363,21.421,21.421,0,0,1-4.357-6.167A15.823,15.823,0,0,1,140-818.752a1.214,1.214,0,0,1,.353-.89,1.192,1.192,0,0,1,.882-.356h3.837a1.175,1.175,0,0,1,.786.291,1.279,1.279,0,0,1,.433.718l.674,3.462a1.978,1.978,0,0,1-.029.828,1.231,1.231,0,0,1-.357.581l-2.717,2.645a16.322,16.322,0,0,0,1.5,2.273,22.419,22.419,0,0,0,1.825,2.046,20.311,20.311,0,0,0,2.059,1.8,20.68,20.68,0,0,0,2.355,1.545l2.64-2.663a1.494,1.494,0,0,1,.669-.4,1.922,1.922,0,0,1,.816-.057l3.267.665a1.382,1.382,0,0,1,.727.455,1.16,1.16,0,0,1,.282.765v3.814a1.191,1.191,0,0,1-.356.882A1.214,1.214,0,0,1,158.754-800Zm-15.726-13.145,2.1-2.009a.21.21,0,0,0,.074-.124.275.275,0,0,0-.006-.147l-.511-2.629a.242.242,0,0,0-.079-.136.228.228,0,0,0-.147-.045h-2.516a.154.154,0,0,0-.113.045.153.153,0,0,0-.045.113,15.049,15.049,0,0,0,.395,2.45A14.978,14.978,0,0,0,143.028-813.144Zm10.235,10.167a12.1,12.1,0,0,0,2.44.834,13.842,13.842,0,0,0,2.374.343.153.153,0,0,0,.113-.045.153.153,0,0,0,.045-.113v-2.475a.228.228,0,0,0-.045-.147.242.242,0,0,0-.136-.079l-2.471-.5a.186.186,0,0,0-.119-.006.289.289,0,0,0-.107.074ZM143.028-813.144ZM153.263-802.976Z"
                    transform="translate(1105.999 1301.999)"
                    fill="#072635"
                  />
                </g>
              </svg>

              <div class="more-info">
                <p>Emergency Contacts</p>
                <p>${userData.emergency_contact}</p>
              </div>
            </div>
            <div class="p-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
              >
                <g id="InsuranceIcon" transform="translate(-1235 -471)">
                  <circle
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    cx="21"
                    cy="21"
                    r="21"
                    transform="translate(1235 471)"
                    fill="#f6f7f8"
                  />
                  <path
                    id="verified_user_FILL0_wght300_GRAD0_opsz24"
                    d="M186.9-842.111l-1.7-1.7a.784.784,0,0,0-.558-.244.764.764,0,0,0-.569.244.786.786,0,0,0-.249.572.786.786,0,0,0,.249.572l2.153,2.17a.927.927,0,0,0,.677.29.927.927,0,0,0,.677-.29l4.432-4.432a.793.793,0,0,0,.244-.567.774.774,0,0,0-.244-.577.786.786,0,0,0-.572-.249.786.786,0,0,0-.572.249Zm1.123,8.882a1.986,1.986,0,0,1-.327-.027,1.811,1.811,0,0,1-.311-.08A10.471,10.471,0,0,1,182-837.6a11.865,11.865,0,0,1-2-6.611v-4.816a1.829,1.829,0,0,1,.352-1.1,2.01,2.01,0,0,1,.9-.708l6.087-2.273a1.993,1.993,0,0,1,.677-.123,1.993,1.993,0,0,1,.677.123l6.087,2.273a2.01,2.01,0,0,1,.9.708,1.829,1.829,0,0,1,.352,1.1v4.816a11.865,11.865,0,0,1-2,6.611,10.471,10.471,0,0,1-5.383,4.266,1.811,1.811,0,0,1-.311.08A1.986,1.986,0,0,1,188.022-833.229Zm0-1.573a8.7,8.7,0,0,0,4.6-3.529,10.157,10.157,0,0,0,1.818-5.882v-4.827a.319.319,0,0,0-.057-.185.341.341,0,0,0-.159-.123l-6.087-2.273a.3.3,0,0,0-.113-.021.3.3,0,0,0-.113.021l-6.087,2.273a.341.341,0,0,0-.159.123.319.319,0,0,0-.057.185v4.827a10.157,10.157,0,0,0,1.818,5.882A8.7,8.7,0,0,0,188.022-834.8ZM188.022-843.23Z"
                    transform="translate(1067.999 1335.229)"
                    fill="#072635"
                  />
                </g>
              </svg>

              <div class="more-info">
                <p>Insurance provider</p>
                <p class="info-msg">${userData.insurance_type}</p>
              </div>
            </div>
            <button>Show all information</button> 
                
          `;
};

//Helper function for patient laboratory results
const getLabResults = (data) => {
  labInfo.innerHTML = `
          <h2>Lab Results</h2>
       
           <div class="results scroll">
            ${data
              .map(
                (labData) => `
            <div class="result">
              <p>${labData}</p>
            
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <path id="download_FILL0_wght300_GRAD0_opsz24_1_" data-name="download_FILL0_wght300_GRAD0_opsz24 (1)" d="M190-765.45a1.282,1.282,0,0,1-.449-.077,1.106,1.106,0,0,1-.395-.264l-4.146-4.146a.94.94,0,0,1-.294-.7,1.025,1.025,0,0,1,.294-.709,1.019,1.019,0,0,1,.713-.321.944.944,0,0,1,.713.3L189-768.8V-779a.968.968,0,0,1,.287-.713A.968.968,0,0,1,190-780a.968.968,0,0,1,.713.287A.968.968,0,0,1,191-779v10.2l2.564-2.564a.952.952,0,0,1,.706-.294,1,1,0,0,1,.719.314,1.044,1.044,0,0,1,.3.7.932.932,0,0,1-.3.7l-4.146,4.146a1.1,1.1,0,0,1-.395.264A1.282,1.282,0,0,1,190-765.45ZM182.411-760a2.327,2.327,0,0,1-1.71-.7,2.327,2.327,0,0,1-.7-1.71v-2.615a.968.968,0,0,1,.287-.713.968.968,0,0,1,.713-.287.968.968,0,0,1,.713.287.968.968,0,0,1,.287.713v2.615a.392.392,0,0,0,.128.282.392.392,0,0,0,.282.128h15.179a.392.392,0,0,0,.282-.128.392.392,0,0,0,.128-.282v-2.615a.968.968,0,0,1,.287-.713.968.968,0,0,1,.713-.287.968.968,0,0,1,.713.287.968.968,0,0,1,.287.713v2.615a2.327,2.327,0,0,1-.7,1.71,2.327,2.327,0,0,1-1.71.7Z" transform="translate(-180.001 779.999)"/>
            </svg>
           </div>`
              )
              .join(' ')}
            </div> 
            
               
          `;
};

//Helper functions for Recent diagnosis
const getMonthNumber = (month) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months.indexOf(month) + 1;
};

const recentDiagnosisHistory = (data, n) => {
  const sortedDiagnosis = data
    .sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      } else {
        return getMonthNumber(b.month) - getMonthNumber(a.month);
      }
    })
    .slice(0, n);
  return [...sortedDiagnosis].reverse();
};

//Helper functions to retrieve various BP values and entries
const systolicEntries = (data) => {
  return data.map((entry) => entry.blood_pressure.systolic);
};
const diastolicEntries = (data) => {
  return data.map((entry) => entry.blood_pressure.diastolic);
};

const systolicValues = (data) => {
  return data.map((entry) => entry.blood_pressure.systolic.value);
};
const diastolicValues = (data) => {
  return data.map((entry) => entry.blood_pressure.diastolic.value);
};

//Helper function to format Date
const getDateFormat = (data) => {
  const chartDateFormat = data.map((date) => {
    const dateInstance = new Date(`${date.month} 1, ${date.year}`);
    const dateFormat = { year: 'numeric', month: 'short' };
    const diagnosisDate = dateInstance
      .toLocaleString('en-US', dateFormat)
      .replace(' ', ', ');
    return diagnosisDate;
  });
  return chartDateFormat;
};

//Fetch function
async function fetchPatientsData(url, credentials, duration, index) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network Error. Please check your network');
    }
    const data = await response.json();
    console.log(index);
    getSingleUser(data, duration, index);
    getPatientList(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let duration = 6;
  fetchPatientsData(url, credentials, duration, currentIndex);
  diagHistoryTitle.innerText = 'Diagnosis History';
  options.innerHTML = `<p class="chart-title">Blood Pressure</p>
                  <select class="chart-duration">
                    <option value='6'>Last 6 months</option>
                    <option value="9">Last 9 months</option>
                  </select>`;

  chartContainer.style.backgroundColor = '#f4f0fe';
  const chartDuration = document.querySelector('.chart-duration');

  chartDuration.addEventListener('change', (e) => {
    e.preventDefault();
    const number = e.target.value;
    duration = Number(number);
    console.log(currentIndex);
    fetchPatientsData(url, credentials, duration, currentIndex);
  });

  hamburger.addEventListener('click', () => {
    patientsContainer.style.display = 'flex';
    modal.style.display = 'block';
    closeBtn.style.display = 'block';
    hamburger.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => {
    patientsContainer.style.display = 'none';
    modal.style.display = 'none';
    closeBtn.style.display = 'none';
    hamburger.style.display = 'block';
  });

  modal.addEventListener('click', () => {
    patientsContainer.style.display = 'none';
    modal.style.display = 'none';
    closeBtn.style.display = 'none';
    hamburger.style.display = 'block';
  });
});

// All Users
const getPatientList = (allPatientData) => {
  patientsContainer.innerHTML = `
  <div class="container-title">
            <h2>Patients</h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.995"
              height="18"
              viewBox="0 0 17.995 18"
            >
              <path
                id="search_FILL0_wght300_GRAD0_opsz24"
                d="M142.675-811.574a6.293,6.293,0,0,1-4.626-1.895,6.293,6.293,0,0,1-1.895-4.626,6.293,6.293,0,0,1,1.895-4.626,6.293,6.293,0,0,1,4.626-1.895,6.293,6.293,0,0,1,4.626,1.895,6.293,6.293,0,0,1,1.895,4.626,6.254,6.254,0,0,1-.383,2.182,6.1,6.1,0,0,1-1.023,1.808l6.135,6.135a.773.773,0,0,1,.227.557.754.754,0,0,1-.227.567.765.765,0,0,1-.562.232.765.765,0,0,1-.562-.232l-6.135-6.135a6.1,6.1,0,0,1-1.839,1.033,6.318,6.318,0,0,1-2.151.373Zm0-1.6a4.749,4.749,0,0,0,3.491-1.43,4.749,4.749,0,0,0,1.43-3.491,4.749,4.749,0,0,0-1.43-3.491,4.749,4.749,0,0,0-3.491-1.43,4.749,4.749,0,0,0-3.491,1.43,4.749,4.749,0,0,0-1.43,3.491,4.749,4.749,0,0,0,1.43,3.491A4.749,4.749,0,0,0,142.675-813.173Z"
                transform="translate(-136.155 824.614)"
                fill="#072635"
              />
            </svg>
          </div>
          <div class="patients scroll">
          ${allPatientData
            .map(
              (data, index) => `
            <div class="${
              currentIndex === null && data.name === 'Jessica Taylor'
                ? 'patient active'
                : currentIndex === index
                ? 'patient active'
                : 'patient'
            }">
              <div class="patient-detail">
                <img
                  src=${data.profile_picture}
                  alt="${
                    data.gender === 'Female'
                      ? 'Picture of smiling female patient'
                      : 'Picture of smiling Male patient'
                  }"
                />
                <div>
                  <p class="patient-name">${data.name}</p>
                  <p class="patient-bio"><span>${data.gender},</span><span>${
                data.age
              }</span></p>
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="3.714"
                viewBox="0 0 18 3.714"
              >
                <path
                  id="more_horiz_FILL0_wght300_GRAD0_opsz24"
                  d="M191.09-536.285a1.788,1.788,0,0,1-1.312-.546,1.788,1.788,0,0,1-.546-1.312,1.788,1.788,0,0,1,.546-1.312A1.788,1.788,0,0,1,191.09-540a1.788,1.788,0,0,1,1.312.546,1.788,1.788,0,0,1,.546,1.312,1.788,1.788,0,0,1-.546,1.312A1.788,1.788,0,0,1,191.09-536.285Zm7.143,0a1.788,1.788,0,0,1-1.312-.546,1.788,1.788,0,0,1-.546-1.312,1.788,1.788,0,0,1,.546-1.312,1.788,1.788,0,0,1,1.312-.546,1.788,1.788,0,0,1,1.312.546,1.788,1.788,0,0,1,.546,1.312,1.788,1.788,0,0,1-.546,1.312A1.788,1.788,0,0,1,198.233-536.285Zm7.143,0a1.788,1.788,0,0,1-1.312-.546,1.788,1.788,0,0,1-.546-1.312,1.788,1.788,0,0,1,.546-1.312,1.788,1.788,0,0,1,1.312-.546,1.788,1.788,0,0,1,1.312.546,1.788,1.788,0,0,1,.546,1.312,1.788,1.788,0,0,1-.546,1.312,1.788,1.788,0,0,1-1.312.546Z"
                  transform="translate(-189.233 539.999)"
                  fill="#072635"
                />
              </svg>
             </div>
            
           `
            )
            .join(' ')}
        </div>
          
          </div>`;

  //Clicking patient
  const allPatient = document.querySelectorAll('.patient');
  const chartDuration = document.querySelector('.chart-duration');

  allPatient.forEach((patientNav, i) => {
    patientNav.addEventListener('click', (e) => {
      currentIndex = i;
      e.preventDefault();
      allPatient.forEach((patient) => patient.classList.remove('active'));
      patientNav.classList.add('active');
      getSingleUser(allPatientData, (num = 6), currentIndex);
      chartDuration.value = 6;
    });
  });
};

//Fetching a single user
const getSingleUser = (allPatientData, num, i) => {
  if (i !== null) {
    singleUser = allPatientData?.filter((data, index) => index === i)[0];
  } else {
    singleUser = allPatientData?.filter(
      (data) => data.name === 'Jessica Taylor'
    )[0];
  }

  const diagnosisHistory = singleUser?.diagnosis_history;
  const duration = typeof num !== 'number' ? diagnosisHistory.length : num;
  const recentHistory = recentDiagnosisHistory(diagnosisHistory, duration);

  const chartDates = getDateFormat(recentHistory);
  const sysResult = systolicValues(recentHistory);
  const diasResult = diastolicValues(recentHistory);

  const diagEntries = [
    systolicEntries(recentHistory),
    diastolicEntries(recentHistory),
  ];

  if (diagnosisHistorychart) {
    diagnosisHistorychart.destroy();
  }

  //The Chartjs method
  diagnosisHistorychart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartDates,
      datasets: [
        {
          label: 'Systolis',
          data: sysResult,
          backgroundColor: '#C26EB4',
          borderColor: '#C26EB4',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 6,
        },
        {
          label: 'Diastolic',
          data: diasResult,
          borderColor: '#7E6CAB',
          backgroundColor: '#7E6CAB',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 6,
        },
      ],
    },
    options: {
      devicePixelRatio: 2.5,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: '#072635',
            font: {
              size: 12,
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#072635',
            font: {
              size: 12,
            },
          },
        },
      },
      plugins: {
        htmlLegend: {
          containerID: 'legend-container',
          bpResults: diagEntries,
        },
        legend: {
          display: false,
        },
      },
    },
    plugins: [htmlLegendPlugin],
  });

  //Rate cards
  rateCards.innerHTML = '';
  const diagnosisRates = getDiagnosisRates(recentHistory);

  createRateCard(
    diagnosisRates[0].respiratory,
    'respiratory-card',
    'Respiratory Rate',
    'bpm',
    respiratorySvg
  );
  createRateCard(
    diagnosisRates[0].temperature,
    'temperature-card',
    'Temperature',
    '°F',
    temperatureSvg
  );
  createRateCard(
    diagnosisRates[0].heartRate,
    'heart-card',
    'Heart Rate',
    'bpm',
    heartSvg
  );

  //Diagnostic List
  patientDiagList.innerHTML = '';
  const diagnosticList = singleUser?.diagnostic_list;
  diagListTable(diagnosticList);

  //Single user Bio-data
  patientInfo.innerHTML = '';
  getPatientBioData(singleUser);

  //Lab Results
  labInfo.innerHTML = '';
  const labResults = singleUser?.lab_results;
  getLabResults(labResults);
};
