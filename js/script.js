let usersList = {};


document.querySelector('#get-users').addEventListener("click", getUserCollection);
document.querySelector('#list-users').addEventListener("click", displayUsers);


// ------- DB ------- //

const dbConfig = {
    apiKey: "AIzaSyCnVm3GbSfZQxPvk1QPDlEL-gpfwryBJSQ",
    authDomain: "js-users-app.firebaseapp.com",
    databaseURL: "https://js-users-app.firebaseio.com",
    projectId: "js-users-app",
    storageBucket: "js-users-app.appspot.com",
    messagingSenderId: "34955808708"
};

firebase.initializeApp(dbConfig);

const firestore = firebase.firestore();

const settings = {
    timestampsInSnapshots: true
};

firestore.settings(settings);

// ------- !! ------- //




function getUserCollection() {
    firestore.collection("users").get().then((queryRes) => {
        let docsCol = queryRes.docs;

        console.log(queryRes.docs);
    
        docsCol.forEach((user) => {
            let userId = user.id;
     
            usersList[userId] = {
                userName: user.data().name,
                userSurname: user.data().surname,
                userRegNum: user.data().regNum,
                userDepartment: user.data().department,
                userPosition: user.data().position,
                userEmail: user.data().email,
                userPrimPhone: user.data().primPhone,
                userSecPhone: user.data().secPhone,
            };
        });
    });
}



function displayUsers() {

    let keys = Object.keys(usersList);
    const {bind, wire} = hyperHTML;

    bind(document.querySelector('#app'))`${
        keys.map(
            user => wire(usersList[user])`
                <div class="container-fluid">
                    <div class="col-md-8 col-md-offset-2">

                        <div class="panel">
                            <div class="panel-heading panel-content">
                                <div class="row">
                                    <div class="col-md-2 status-info shadow-right">
                                        <div>Status Info</div>
                                    </div>
                                    <div class="col-md-8 user-name">
                                        <div>${usersList[user].userName} ${usersList[user].userSurname}</div>
                                    </div>
                                    <div class="col-md-2 user-edit shadow-left">
                                        <div class="col-md-6 user-edit-panel">
                                            <button class="btn btn-warning" onclick="openEditModal()" data-toggle="modal" data-target="#editModal">Edit</button>
                                        </div>
                                        <div class="col-md-6 user-delete-panel">
                                            <button class="btn btn-danger" onclick="openRemoveModal()" data-toggle="modal" data-target="#removeModal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-body panel-main">
                                <div class="row row-shadow">
                                    <div class="user-pic col-md-3">
                                        <img class="image" src="img/user-icon.png" alt="">
                                    </div>
                                    <div class="user-content col-md-9">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="user-content-title">
                                                    <div>Personal Info</div>
                                                    <div class="col-md-11 col-md-offset-1 user-content-info">
                                                        <span>Registration Number:</span>
                                                        <span>${usersList[user].userRegNum}</span>
                                                    </div>
                                                    <div class="col-md-11 col-md-offset-1 user-content-info">
                                                        <span>Department:</span>
                                                        <span>${usersList[user].userDepartment}</span>
                                                    </div>
                                                    <div class="col-md-11 col-md-offset-1 user-content-info">
                                                        <span>Position:</span>
                                                        <span>${usersList[user].userPosition}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="user-content-title">
                                                    <div>Contact Info</div>
                                                    <div class="col-md-11 col-md-offset-1 user-content-info">
                                                        <span>Email:</span>
                                                        <span>${usersList[user].userEmail}</span>
                                                    </div>
                                                    <div class="col-md-11 col-md-offset-1 user-content-info">
                                                        <span>Primary Phone:</span>
                                                        <span>${usersList[user].userPrimPhone}</span>
                                                    </div>
                                                    <div class="col-md-11 col-md-offset-1 user-content-info">
                                                        <span>Secondary Phone:</span>
                                                        <span>${usersList[user].userSecPhone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer"></div>
                        </div>
                    </div>
                </div>
            `
        )
    }`;

}


