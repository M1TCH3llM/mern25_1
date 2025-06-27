var User = {
    FName : "Kalani",
    Location : "Denver",
    Age : " 30",

    printInfo : function () {
        console.log(this);
        console.log("Outer", this.FName);

        setTimeout(function () {
            console.log(this);
        console.log("This Will Print Undefined", this.FName);
        }, 3000)

        setTimeout(function () {
            console.log(this);
        console.log("Outer", this.FName);
        }.bind(this), 6000)

        this.FName = "Mitch";

    }
}

User.printInfo()