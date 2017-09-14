/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        // add event listener for back button 
        document.addEventListener("backbutton", backButtonClicked, false);

        // set up home page screen when device is ready
        setupHomePage();
    },
};

// create array of page info objects
pageInfoArray = [
    {
        title: "H Building",
        subtitle: "First Floor",
        imageUrl: "img/floor1.PNG"
    },
    {
        title: "H Building",
        subtitle: "Second Floor",
        imageUrl: "img/floor2.PNG"
    },
    {
        title: "H Building",
        subtitle: "Third Floor",
        imageUrl: "img/floor3.PNG"
    },
    {
        title: "GGC",
        subtitle: "Campus Map",
        imageUrl: "img/campusMap.PNG"
    },
    {
        title: "About",
        subtitle: "About",
        imageUrl: "img/grizzly.PNG",
        content: `
            <h3>By Robert Bryan</h3>
            <h4>ITEC 4550 | Created August 26th, 2017</h4>
        `
    }
];

// clear the page content and setup the home page
function backButtonClicked() {
    clearPage();
    setupHomePage();
}

// when we setup the home page again we have to setup the event listeners again
function setupEventHandlers() {
        listItems = document.getElementsByTagName("li");
        for (var index = 0; index < listItems.length; index++) {
            listItems[index].addEventListener("click", function() {
                pageSelected(this.innerHTML);
            });
        } 
}

// set the page content to its home page values
function setupHomePage() {
    document.querySelector("#title").innerHTML = "GGC";
    document.querySelector("#image").setAttribute("src", "img/HealthSciencesBuilding.jpg");
    document.querySelector("#subtitle").innerHTML = "Overview - H Building";
    document.querySelector("#content").innerHTML = "<ul></ul>"
    for (let index in pageInfoArray) {
        let listItemNode = document.createElement("li");
        listItemNode.innerHTML = pageInfoArray[index].subtitle;
        document.querySelector("ul").appendChild(listItemNode);
    }
    setupEventHandlers();
}

// called from event handler
function pageSelected(subtitle) {
    for (let index in pageInfoArray) {
        if (pageInfoArray[index].subtitle === subtitle) {
            updatePage(pageInfoArray[index]);
        }
    }
}

// set page content to pageInfo
function updatePage(pageInfo) {
    clearPage();
    document.querySelector("#title").innerHTML = pageInfo.title;
    document.querySelector("#image").setAttribute("src", pageInfo.imageUrl);
    document.querySelector("#subtitle").innerHTML = pageInfo.subtitle;
    if (pageInfo.content) {
        document.querySelector("#content").innerHTML = pageInfo.content;
    }
}

// reset page content
function clearPage() {
    document.querySelector("#title").innerHTML = "";
    document.querySelector("#subtitle").innerHTML = "";
    document.querySelector("#content").innerHTML = "";
}

app.initialize();