import logo from './logo.svg';
import './App.css';

import * as firebase from 'firebase';
import '@firebase/database'
import '@firebase/auth';
import { useEffect, useState } from 'react';

import { Pie, Line } from 'react-chartjs-2';
import { Tabs, Select } from 'antd';
const { Option } = Select;
const { TabPane } = Tabs;
var _ = require('lodash');

var config = {
  apiKey: "AIzaSyDzF8wXH6JSLeW0m5HphLme0V7nV15srrk",
  authDomain: "rumble-signup.firebaseapp.com",
  databaseURL: "https://rumble-signup.firebaseio.com",
  projectId: "rumble-signup",
  storageBucket: "rumble-signup.appspot.com",
  messagingSenderId: "142131072925",
  appId: "1:142131072925:web:fdd8a9ed39d5f7b4e46974",
  measurementId: "G-RDXNCRB8HG"
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

function App() {
  const [data, setData] = useState(0);
  const [urlCount, seturlCount] = useState([]);
  const [urls, setUrls] = useState([]);
  const [count, setCount] = useState([]);
  const [visit, setVisit] = useState([]);
  const [email, setEmail] = useState([]);


  const [DateLabel, setDateLabel] = useState([]);
  const [DateByCount, setDateByCount] = useState([]);
  const [visitTrueTime, setvisitTrueTime] = useState([]);
  const [visitCountTime, setvisitCountTime] = useState([]);
  const [EmailTrueTime, setEmailTrueTime] = useState([]);
  const [EmailCountTime, setEmailCountTime] = useState([]);

  const [cloneDateLabel, setcloneDateLabel] = useState([]);
  const [cloneDateByCount, setcloneDateByCount] = useState([]);
  const [clonevisitTrueTime, setclonevisitTrueTime] = useState([]);
  const [clonevisitCountTime, setclonevisitCountTime] = useState([]);
  const [cloneEmailTrueTime, setcloneEmailTrueTime] = useState([]);
  const [cloneEmailCountTime, setcloneEmailCountTime] = useState([]);


  const [byDate, setbyDate] = useState([]);
  const [DatePushed, setDatePushed] = useState([]);
  const [DateEmail, setDateEmail] = useState([]);

  const [regionCount, setregionCount] = useState([]);
  const [regionList, setregionList] = useState([]);

  useEffect(() => {
    firebase
      .database().ref()
      .on("value", snapshot => {
        const data = snapshot.val()
        const count = snapshot.numChildren();
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));

          var reversed = initMessages.reverse()
          console.log('--data--', reversed);
          setData(reversed)

          let currentDate = new Date()
          let currentMonth = new Date().getMonth();
          let currentYear = new Date().getFullYear();

          var arr = [];
          let urls = [];
          let count = [];
          let pushes = [];
          let visited = [];
          let email = [];
          let emailCount = [];
          let byDate = []
          let VisitByTime = [];
          let DateByCount = [];
          let DatePushed = [];
          let DateEmail = [];


          let regions = []
          let regionCount = [];
          let region = [];
          reversed.forEach(element => {
            if (!(arr.some(e => e.url === element.url))) {
              arr.push({ url: element.url, count: 0 });
              pushes.push({ url: element.url, pushes: 0 });
              email.push({ url: element.url, email: 0 });
              urls.push(element.url);
            }
          });
          reversed.forEach(element => {
            if (element.time) {
              if (!(byDate.some(e => new Date(e.date).getDate() == new Date(element.time).getDate()))) {
                const diffTime = Math.abs(new Date(element.time) - currentDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays < 30) {
                  console.log(new Date(element.time).getDate());
                  byDate.push({ url: element.url, count: 0, date: element.time });
                  DatePushed.push({ url: element.url, count: 0, date: element.time })
                  DateEmail.push({ url: element.url, count: 0, date: element.time })
                }

              }
            }
            if (element.region) {
              if (!(regions.some(e => e.region == element.region))) {
                regions.push({ url: element.url, count: 0, region: element.region });
              }
            }
          });


          regions.forEach((e, index) => {
            reversed.forEach((element, i) => {
              if (e.region === element.region) {
                e.count = e.count + 1
              }
            })
          })

          regions.forEach(element => {
            regionCount.push(element.count)
            region.push(element.region)
          });

          setregionCount(regionCount)
          setregionList(region)

          arr.forEach((e, index) => {
            reversed.forEach((element, i) => {
              if (e.url === element.url) {
                e.count = e.count + 1;
                if (element.click) {
                  pushes[index].pushes = pushes[index].pushes + 1
                }
                if (element.email && element.email !== "null" && element.email != null && element.email !== undefined) {
                  email[index].email = email[index].email + 1
                }
              }
            });
          });
          byDate.forEach((e, index) => {
            reversed.forEach((element, i) => {
              if ((new Date(e.date).getDate()) === (new Date(element.time).getDate())) {
                // if ((currentMonth === date.getMonth()) && (currentYear == date.getFullYear())) {
                e.count = e.count + 1
                if (element.click) {
                  DatePushed[index].count = DatePushed[index].count + 1
                }

                if (element.email && element.email != "null" && element.email != null && element.email !== undefined) {
                  console.log(element.email);
                  DateEmail[index].count = DateEmail[index].count + 1
                }

                // }
              }
            })
          })

          arr.forEach(element => {
            count.push(element.count)
          });
          pushes.forEach(element => {
            visited.push(element.pushes)
          });
          email.forEach(element => {
            emailCount.push(element.email)
          });
          byDate.forEach(element => {
            VisitByTime.push(new Date(element.date).getDate())
            DateByCount.push(element.count)
          });


          let PuhsedTrueTime = []
          let pushedTrueCount = []
          DatePushed.forEach(element => {
            PuhsedTrueTime.push(new Date(element.date).getDate())
            pushedTrueCount.push(element.count)
          });

          let EmailLabelTime = []
          let EmailTimeCount = []
          DateEmail.forEach(element => {
            EmailLabelTime.push(new Date(element.date).getDate())
            EmailTimeCount.push(element.count)
          });

          console.log('----date-----', byDate);
          console.log('----DatePushed-----', DatePushed);
          console.log('----DateEmail-----', DateEmail);


          setbyDate(byDate)
          setDatePushed(DatePushed)
          setDateEmail(DateEmail)

          setDateLabel(VisitByTime)
          setcloneDateLabel(VisitByTime)
          setDateByCount(DateByCount)
          setcloneDateByCount(DateByCount)
          setUrls(urls)
          setCount(count)
          seturlCount(arr)
          setVisit(visited)
          setEmail(emailCount)

          setvisitTrueTime(PuhsedTrueTime)
          setclonevisitTrueTime(PuhsedTrueTime)
          setvisitCountTime(pushedTrueCount)
          setclonevisitCountTime(pushedTrueCount)
          setEmailTrueTime(EmailLabelTime)
          setcloneEmailTrueTime(EmailLabelTime)
          setEmailCountTime(EmailTimeCount)
          setcloneEmailCountTime(EmailTimeCount)
        }
      });
  }, []);


  function handleChange(value) {
    let VisitByTime = [];
    let DateByCount = [];
    let EmailLabelTime = [];
    let EmailTimeCount = [];
    let PuhsedTrueTime = []
    let pushedTrueCount = []
    if (value !== "All") {
      byDate.forEach(element => {
        if (value == element.url) {
          VisitByTime.push(new Date(element.date).getDate())
          DateByCount.push(element.count)
        }
      });
      DateEmail.forEach(element => {
        if (value == element.url) {
          EmailLabelTime.push(new Date(element.date).getDate())
          EmailTimeCount.push(element.count)
        }
      });
      DatePushed.forEach(element => {
        if (value == element.url) {
          PuhsedTrueTime.push(new Date(element.date).getDate())
          pushedTrueCount.push(element.count)
        }
      });
      setDateLabel(VisitByTime)
      setDateByCount(VisitByTime)
      setEmailTrueTime(EmailLabelTime)
      setEmailCountTime(EmailTimeCount)
      setvisitTrueTime(PuhsedTrueTime)
      setvisitCountTime(pushedTrueCount)


    } else {
      setDateLabel(cloneDateLabel)
      setDateByCount(cloneDateByCount)
      setEmailTrueTime(cloneEmailTrueTime)
      setEmailCountTime(cloneEmailCountTime)
      setvisitTrueTime(clonevisitTrueTime)
      setvisitCountTime(clonevisitCountTime)
    }
  }


  const Visit = {
    labels: urls,
    datasets: [
      {
        label: '# of Visit',
        data: count,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        borderWidth: 1,
      },
    ],
  }



  const regionData = {
    labels: regionList,
    datasets: [
      {
        label: 'Count by region',
        data: regionCount,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        borderWidth: 1,
      },
    ],
  }


  const pushes = {
    labels: urls,
    datasets: [
      {
        label: '# of Visit',
        data: visit,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        borderWidth: 1,
      },
    ],
  }


  const byDateChart = {
    labels: DateLabel,
    datasets: [
      {
        label: 'No. of visit By Date',
        data: DateByCount,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  const byDateVisit = {
    labels: visitTrueTime,
    datasets: [
      {
        label: 'No. of Pushed By Date',
        data: visitCountTime,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }


  const byDateEmail = {
    labels: EmailTrueTime,
    datasets: [
      {
        label: 'No. of Email By Date',
        data: EmailCountTime,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }


  const emailChart = {
    labels: urls,
    datasets: [
      {
        label: '# of Visit',
        data: email,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          "#FDEDEC",
          "#B9770E",
          "#45B39D",
          "#6495ED",
          "#CD5C5C",
          "#154360"
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="MainDiv">

      <Tabs defaultActiveKey="1" tabPosition={'left'}>
        <TabPane key={1} tab={'Total Visit'}>
          <div className="ChartCard">
            <Pie data={Visit} options={
              {
                title: {
                  display: "Title",
                  text: 'Total visit',
                  fontSize: 25
                },
                maintainAspectRatio: false,
                legend: {
                  position: 'right',
                  labels: {
                    boxWidth: 10
                  }
                }
              }
            } />
          </div>
        </TabPane>
        <TabPane key={2} tab={'Total Click/Pushed'}>
          <div className="ChartCard">
            <Pie data={pushes} options={
              {
                title: {
                  display: "Title",
                  text: 'Total Click/Pushed',
                  fontSize: 25
                },
                maintainAspectRatio: false,
                legend: {
                  position: 'right',
                  labels: {
                    boxWidth: 10
                  }
                }
              }
            } />
          </div>
        </TabPane>

        <TabPane key={3} tab={'Total Email'}>
          <div className="ChartCard">
            <Pie data={emailChart} options={
              {
                title: {
                  display: "Title",
                  text: 'Total Email',
                  fontSize: 25
                },
                maintainAspectRatio: false,
                legend: {
                  position: 'right',
                  labels: {
                    boxWidth: 10
                  }
                }
              }
            } />
          </div>
        </TabPane>

        <TabPane key={4} tab={'Count By Region'}>
          <div className="ChartCard">
            <Pie data={regionData} options={
              {
                title: {
                  display: "Title",
                  text: 'Count By Region',
                  fontSize: 25
                },
                maintainAspectRatio: false,
                legend: {
                  position: 'right',
                  labels: {
                    boxWidth: 10
                  }
                }
              }
            } />
          </div>
        </TabPane>
      </Tabs>

      <div style={{ margin: 40, color: 'gray', fontWeight: '600', textAlign: 'center', fontSize: 22 }}>
        {/* Line Chart */}
        <Select defaultValue="All" style={{ width: '62%' }} onChange={handleChange}>
          <Option value="All">All</Option>
          {urls.map((i, index) => {
            return (
              <Option value={i}>{i}</Option>
            )
          })}
          {/* <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="Yiminghe">yiminghe</Option> */}
        </Select>
      </div>


      <Tabs defaultActiveKey="1" tabPosition={'left'}>
        <TabPane key={1} tab={'Total visit by Date'}>
          <div className="ChartCard">
            <Line data={byDateChart}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                title: {
                  display: "Title",
                  text: 'Total visit by Date',
                  fontSize: 25
                },
                legend: {
                  display: true,
                  // position: 'right',
                  labels: {
                    boxWidth: 10
                  }
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Count'
                    },
                    ticks: {
                      beginAtZero: true,
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date'
                    }
                  }],
                }
              }} />

          </div>
        </TabPane>
        <TabPane key={2} tab={'Total pushed by Date'}>
          <div className="ChartCard">

            <Line data={byDateVisit}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                title: {
                  display: "Title",
                  text: 'Total visit by Date',
                  fontSize: 25
                },
                legend: {
                  display: true,
                  // position: 'right',
                  labels: {
                    boxWidth: 10
                  }
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Count'
                    },
                    ticks: {
                      beginAtZero: true,
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date'
                    }
                  }],
                }
              }} />
          </div>
        </TabPane>

        <TabPane key={3} tab={'Total Email by Date'}>
          <div className="ChartCard">
            <Line data={byDateEmail}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                title: {
                  display: "Title",
                  text: 'Total visit by Date',
                  fontSize: 25
                },
                legend: {
                  display: true,
                  // position: 'right',
                  labels: {
                    boxWidth: 10
                  }
                },
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Count'
                    },
                    ticks: {
                      beginAtZero: true,
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Date'
                    }
                  }],
                }
              }} />

          </div>
        </TabPane>
      </Tabs>
      {/* <div class="fullscreen-bg">
        <video loop={true} muted={true} autoPlay={true} class="fullscreen-bg__video">
          <source src={sample} type="video/mp4" />
        </video>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ height: '100%', alignItems: 'center', margin: 0 }}>
        <Col style={{ backgroundColor: '#30254f', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'column' }} span={4}>
          <div style={{ display: 'flex', flexDirection: 'column', marginRight: 25, width: '60%' }}>
            <a className="TabItem">
              WELCOME
          </a>
            <a className="TabItem">
              WHO WE ARE
          </a>
            <a className="TabItem">
              WHAT WE DO
          </a>
            <a className="TabItem">
              GET IN TOUCH
          </a>
          </div>
        </Col>
      </Row> */}
      {/* <div style={{ flex: 1, backgroundColor: '#30254f', height: '100%' }}>
          <div>
            WELCOME
          </div>
          <div>
            WHO WE ARE
          </div>
          <div>
            WHAT WE DO
          </div>
          <div>
            GET IN TOUCH
          </div>
        </div> */}
      {/* <div style={{ flex: 4, backgroundColor: '#5e41a6' }}>

        </div> */}
    </div>
  );
}

export default App;
