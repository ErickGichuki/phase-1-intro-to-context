// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord);
}
function createTimeInEvent(employeeRecord, dateTime){
    const [date, hour] = dateTime.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });
    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    const event = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    };
    employeeRecord.timeOutEvents.push(event);
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const timeIn = timeInEvent.hour;
      const timeOut = timeOutEvent.hour;
      return (timeOut - timeIn) / 100; // Assuming time is stored in HHMM format
    } else {
      return 0; 
    }
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const ratePerHour = employeeRecord.payPerHour;
    return hoursWorked * ratePerHour;
  }
  function allWagesFor(employeeRecord){
    let totalWages = 0;
    employeeRecord.timeInEvents.forEach((timeInEvent, index) => {
        const timeOutEvent = employeeRecord.timeOutEvents[index];
        const hoursWorked = hoursWorkedOnDate(employeeRecord, timeInEvent.date);
        const wagesEarned = wagesEarnedOnDate(employeeRecord, timeInEvent.date);
        totalWages += wagesEarned;
    });
    return totalWages;
  }
  const calculatePayroll = function(employeeRecords){
    let totalPayroll = 0;
    employeeRecords.forEach(employeeRecord => {
        totalPayroll += allWagesFor(employeeRecord);
    });
    return totalPayroll;
  }