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

    clearLineFilter: function() {
        dashboardViewModel.courses.removeAll();

        for (var x in courseData) {
            dashboardViewModel.courses.push(new Course(courseData[x]));
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

    // Add course
    addCourse: function() {
        $('#myModal').empty().append('<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Add Course</h4></div><div class="modal-body"><form class="form-horizontal"> <div class="form-group"> <label for="inputEmail3" class="col-sm-2 control-label">Name</label> <div class="col-sm-10"> <input type="email" class="form-control" id="inputEmail3" placeholder="Name"> </div> </div> <div class="form-group"> <label for="inputPassword3" class="col-sm-2 control-label">BET</label> <div class="col-sm-10"> <input type="text" class="form-control" id="inputPassword3" placeholder="BET"> </div> </div> <div class="form-group"> <label for="type" class="col-sm-2 control-label">Type</label> <div class="col-sm-10"> <select name="type" class="form-control" id="type"> <option value="WBT">WBT</option> <option value="ILT">ILT</option> <option value="WTM">WTM</option> <option value="IT">IT</option> </select> </div> </div> <div class="form-group"> <label for="status" class="col-sm-2 control-label">Status</label> <div class="col-sm-10"> <select name="status" class="form-control" id="status"> <option value="New">New</option> <option value="Updated">Updated</option> <option value="Projected">Projected</option> </select> </div> </div> <div class="form-group"> <label for="time" class="col-sm-2 control-label">Time</label> <div class="col-sm-10"> <input type="text" class="form-control" id="time" placeholder="Time (in hours)"> </div> </div> <div class="form-group"> <label for="t3Date" class="col-sm-2 control-label">T3 Date</label> <div class="col-sm-10"> <input type="date" class="form-control" id="t3Date"> </div> </div> <div class="form-group"> <label for="availableDate" class="col-sm-2 control-label">Available Date</label> <div class="col-sm-10"> <input type="date" class="form-control" id="availableDate"> </div> </div> <div class="form-group"> <label for="completionDate" class="col-sm-2 control-label">Completion Date</label> <div class="col-sm-10"> <input type="date" class="form-control" id="completionDate"> </div> </div> <div class="form-group"> <label for="lines" class="col-sm-2 control-label">Line(s) of Business</label> <div class="col-sm-8"><label class="checkbox-inline"> <input type="checkbox" id="ATS" value="ATS"> ATS </label> <label class="checkbox-inline"> <input type="checkbox" id="atsChat" value="ATS Chat"> ATS Chat </label> <label class="checkbox-inline"> <input type="checkbox" id="billChat" value="Bill Chat"> Bill Chat </label> <label class="checkbox-inline"> <input type="checkbox" id="CLM" value="CLM"> CLM </label> <label class="checkbox-inline"> <input type="checkbox" id="comboBill" value="Combo Bill"> Combo Bill </label> <label class="checkbox-inline"> <input type="checkbox" id="DMDR" value="DMDR"> DMDR </label> <label class="checkbox-inline"> <input type="checkbox" id="DSC" value="DSC"> DSC </label> <label class="checkbox-inline"> <input type="checkbox" id="MSS" value="MSS"> MSS </label> <label class="checkbox-inline"> <input type="checkbox" id="PPD" value="PPD"> PPD </label> <label class="checkbox-inline"> <input type="checkbox" id="retention" value="Retention"> Retention </label> <label class="checkbox-inline"> <input type="checkbox" id="salesChat" value="Sales Chat"> Sales Chat </label> <label class="checkbox-inline"> <input type="checkbox" id="socialMedia" value="Social Media"> Social Media </label> <label class="checkbox-inline"> <input type="checkbox" id="SSG" value="SSG"> SSG </label> <label class="checkbox-inline"> <input type="checkbox" id="voice" value="Voice"> Voice </label> <label class="checkbox-inline"> <input type="checkbox" id="WLNP" value="WLNP"> WLNP </label></div> </div> <div class="form-group"> <label for="notes" class="col-sm-2 control-label">Notes</label> <div class="col-sm-10"> <textarea rows"3" class="form-control" id="notes"> </textarea> </div> </div> <div class="form-group"> <label for="announcement" class="col-sm-2 control-label">Annoucement URL</label> <div class="col-sm-10"> <input type="url" class="form-control" id="announcement" placeholder="URL"> </div> </div> <div class="form-group"> <div class="col-sm-offset-2 col-sm-10"> <button type="submit" class="btn btn-default">Save</button> </div> </div> </form> </div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button></div></div></div>');
    },

    // Insert DOM elements associated with the modal.
    insertModalContent: function() {
        $('#myModal').empty().append('<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">'+this.name+' - '+this.bet+'</h4></div><div class="modal-body"><dl class="dl-horizontal"> <dt>Type:</dt> <dd>'+this.type+'</dd> <dt>Time:</dt> <dd>'+this.time+'</dd> <dt>Status:</dt> <dd>'+this.status+'</dd> <dt>T3 Date:</dt> <dd>'+this.t3+'</dd> <dt>Available Date:</dt> <dd>'+this.available+'</dd> <dt>Completion Date:</dt> <dd>'+this.complete+'</dd> <dt>Line(s) of Business:</dt> <dd>'+this.lines+'</dd> <dt>Notes:</dt> <dd>'+this.notes+'</dd></dl> </div><div class="modal-footer"><button type="button" class="btn btn-default pull-left" data-toggle="tooltip" data-placement="right" title="Course Announcement"><span class="glyphicon glyphicon-open-file" aria-hidden="true"></span></button><button type="button" class="btn btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><button type="button" class="btn btn-primary" data-dismiss="modal">Close</button></div></div></div>');
    }
}

ko.applyBindings(dashboardViewModel);
dashboardViewModel.createList();
dashboardViewModel.query.subscribe(dashboardViewModel.search);