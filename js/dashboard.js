// Class to represent course object.
var Course = function(data) {
    var self = this;
    self.lines = data.lines;
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
};

// Store course data here. 
// ** replace with with AJAX request to pull date from server **
var courseData = [
    {
        lines: ["DSC"],
        name: "DSC Technical Training Series",
        bet: 61484485,
        status: "New",
        type: "WBT",
        time: 0.25,
        t3: "N/A",
        available: "02/09/2016",
        complete: "03/08/2016",
        ca: "",
        notes: ""
    },
    {
        lines: ["Bill Chat", " Retention"],
        name: "Payment Recommender Tool",
        bet: 61407467,
        status: "New",
        type: "WBT",
        time: 0.5,
        t3: "N/A",
        available: "01/04/2016",
        complete: "01/31/2016",
        ca: "",
        notes: ""
    },
    {
        lines: ["Sales Chat", " Social Media"],
        name: "Payment Arrangement Recommender",
        bet: 61518747,
        status: "New",
        type: "WBT",
        time: 0.5,
        t3: "N/A",
        available: "02/12/2016",
        complete: "03/18/2016",
        ca: "",
        notes: ""
    },
    {
        lines: ["Sales Chat", " Social Media"],
        name: "Android for iOS Centers",
        bet: 61518328,
        status: "New",
        type: "ILT",
        time: 16,
        t3: "02/02/2016",
        available: "02/01/2016",
        complete: "03/31/2016",
        ca: "",
        notes: "iPhone"
    },
    {
        lines: ["ATS", "ATS Chat", "Bill Chat", "CLM", "Combo Bill", "MSS", "PPD", "Ret", "Social Media", "Voice"],
        name: "AT&T Refunds for 3rd Party Charges",
        bet: 61518747,
        status: "New",
        type: "WBT",
        time: 0.5,
        t3: "N/A",
        available: "01/18/2016",
        complete: "08/01/2016",
        ca: "",
        notes: "mLearning - 61505854"
    }
];

// Main dashboard view
var dashboardViewModel = {

    // Create list of courses.
    courses: ko.observableArray([]),

    // List of table headers
    headers: ko.observableArray([
        {title: "Course Name", sortKey: "name"},
        {title: "Type", sortKey: "type"},
        {title: "Status", sortKey: "status"}
    ]),

    // List of lines of business used to filter the courses in our UI.
    availableLines: ko.observableArray([
        {line: "ATS"},
        {line: "ATS Chat"},
        {line: "Bill Chat"},
        {line: "CLM"},
        {line: "Combo Bill"},
        {line: "DMDR"},
        {line: "DSC"},
        {line: "MSS"},
        {line: "PPD"},
        {line: "Ret"},
        {line: "Sales Chat"},
        {line: "Social Media"},
        {line: "SSG"},
        {line: "Voice"},
        {line: "WLNP"}
    ]),

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
    },

    // Filter courses by line of business property.
    lineFilter: function(value) {
        dashboardViewModel.courses.removeAll();

        for (var x in courseData) {
            for (var i in courseData[x].lines) {
                if (courseData[x].lines[i] == value) {
                    dashboardViewModel.courses.push(new Course(courseData[x]));
                } 
            }
        }
    },

    sort: function(header, event){
        var sortKey = header.sortKey;
        switch(sortKey){
            case 'name':
                dashboardViewModel.courses.sort(function(a,b){
                    return a.name < b.name ? -1 : a.name > b.name ? 1 : a.name == b.name ? 0 : 0;
                });
                break;
            case 'type':
                dashboardViewModel.courses.sort(function(a,b){
                    return a.type < b.type ? -1 : a.type > b.type ? 1 : a.type == b.type ? 0 : 0;
                });
                break;
            case 'status':
                dashboardViewModel.courses.sort(function(a,b){
                    return a.status < b.status ? -1 : a.status > b.status ? 1 : a.status == b.status ? 0 : 0;
                });
                break;
        }
    },

    // Insert DOM elements associated with the modal.
    insertModalContent: function() {
        $('#myModal').empty().append('<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">'+this.name+' - '+this.bet+'</h4></div><div class="modal-body"><dl class="dl-horizontal"> <dt>Type:</dt> <dd>'+this.type+'</dd> <dt>Time:</dt> <dd>'+this.time+'</dd> <dt>Status:</dt> <dd>'+this.status+'</dd> <dt>T3 Date:</dt> <dd>'+this.t3+'</dd> <dt>Available Date:</dt> <dd>'+this.available+'</dd> <dt>Completion Date:</dt> <dd>'+this.complete+'</dd> <dt>Line(s) of Business:</dt> <dd>'+this.lines+'</dd> <dt>Notes:</dt> <dd>'+this.notes+'</dd></dl> </div><div class="modal-footer"><button type="button" class="btn btn-default pull-left"><span class="glyphicon glyphicon-open-file" aria-hidden="true"></span></button><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button type="button" class="btn btn-primary" data-dismiss="modal">Close</button></div></div></div>');
    },

    // Open note entry field
    openNoteField: function() {
        $('.model-body').append('<textarea class="form-control" rows="3" data-bind="value: notes"></textarea>')
    }
}

ko.applyBindings(dashboardViewModel);
dashboardViewModel.createList();
dashboardViewModel.query.subscribe(dashboardViewModel.search);