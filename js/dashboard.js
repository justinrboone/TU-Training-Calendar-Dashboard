// Class to represent course object.
var Course = function(data) {
    var self = this;
    self.line = data.line;
    self.name = data.name;
    self.bet = data.bet;
    self.status = data.status;
    self.type = data.type;
    self.time = data.time;
    self.t3 = data.t3;
    self.available = data.available;
    self.complete = data.complete;
    self.ca = data.ca;
    self.notes = data.notes;
    self.infoButton = '<a href="#"><span class="glyphicon glyphicon-info-sign"></span></a>'
};

// Store course data here.
var courseData = [
    {
        line: "DSC",
        name: "DSC Technical Training Series",
        bet: 61484485,
        status: "New",
        type: "WBT",
        time: 0.25,
        t3: "",
        available: "2/9/16",
        complete: "3/8/16",
        ca: "",
        notes: ""
    },
    {
        line: ["Bill Chat", "Retention"],
        name: "Payment Recommender Tool",
        bet: 61407467,
        status: "New",
        type: "WBT",
        time: 0.5,
        t3: "",
        available: "1/4/16",
        complete: "1/31/16",
        ca: "",
        notes: ""
    },
    {
        line: ["Sales Chat", "Social Media"],
        name: "Payment Arrangement Recommender",
        bet: 61518747,
        status: "New",
        type: "WBT",
        time: 0.5,
        t3: "",
        available: "2/12/16",
        complete: "3/18/16",
        ca: "",
        notes: ""
    }
];

// Main dashboard view
var dashboardViewModel = {

    // Create list of courses.
    courses: ko.observableArray([]),

    // Temporarily store input from search field
    query: ko.observable(''),

    // Create Course objects from the model data and add them to the courses list.
    createList: function() {
        for (var x in courseData) {
            dashboardViewModel.courses.push(new Course(courseData[x]));
        }
    },

    // Filter the course list based on user input.
    search: function(value) {
        dashboardViewModel.courses.removeAll();

        for (var x in courseData) {
            if (courseData[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                dashboardViewModel.courses.push(new Course(courseData[x]));
            }
        }
    }
}

ko.applyBindings(dashboardViewModel);
dashboardViewModel.createList();
dashboardViewModel.query.subscribe(dashboardViewModel.search);