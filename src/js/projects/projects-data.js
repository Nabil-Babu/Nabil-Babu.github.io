"use strict";

// Single source of truth for project detail content.
const projectsData = [
    {
        id: "scaravan66",
        title: "Scaravan 66",
        genre: "3D Rogue-Like Car Combat",
        description: "Put the pedal to the metal and outgun the Devil in this high-octane car combat roguelike. Get that extra bit of horsepower from allies you meet on the road to take on the fiends of the underworld as you defy fate and anyone who stands in your way.",
        techStack: ["Unreal Engine 5", "C++", "Blueprints"],
        contributions: [
            "Created A.I systems that decided what behaviors and abilities will be activated by NPC's based on a variety of data driven factors such as player actions, ability cooldowns, number of allies/enemies and etc. These systems were built using Unreal's Gameplay Ability System(GAS), Behavior Trees and Utility A.I.",
            "Implemented a custom autonomous vehicle sensor system using C++ and actor components to allow vehicle actors to detect potential collisions and avoid them without expensive distance calls on each potential collision actor. The sensors could be customized to adjust reaction time, reaction strength, and etc to create unique actor traits.",
            "Designed a physically simulated chain system to realistically, and efficiently, constrain vehicles at high speeds. The chain system has interactions throughout the length of its meshes until despawed.",
            "Implemented a rudimentary vehicle destruction system that was able to dynamically decide what parts of a vehicle are launched as debris during explosions and can be interacted with by other actors. This created satisfactory vehicle collisions and death sequences."
        ],
        screenshots: ["assets/images/screenshots/SC1.jpg","assets/images/screenshots/SC2.jpg","assets/images/screenshots/SC3.jpg"],
        bannerImage: "assets/images/projects/Scaravan66.png",
        storeLink: "https://store.steampowered.com/app/3238240/Scaravan_66/"
    },
    {
        id: "rollergirl",
        title: "RollerGirl",
        genre: "3D Cozy Exploration Adventure game",
        description: "Choose your own vibe in this slice-of-life adventure. While exploring a small town on rollerblades, use your MP3 player to set the mood for your summer. Run errands for quirky neighbours, get entangled in local drama and stumble into a teenage romance.",
        techStack: ["Unity Engine", "C#"],
        contributions: [
            "Implemented custom C# API for playing MP3 files and storing track information including genre, album cover, and artist name. The API was designed to be used by designers to get track data easily for the UI during key moments.",
            "Developed the first character controller, player controller, and camera controller for the purposes of grant applications and proof of concept testing.",
            "Integrated popular Unity Asset 'Dialogue System for Unity' to create a dialogue based, quest system."
        ],
        screenshots: ["assets/images/screenshots/RG1.jpg","assets/images/screenshots/RG2.jpg","assets/images/screenshots/RG3.jpg"],
        bannerImage: "assets/images/projects/RollerGirl.png",
        storeLink: "https://store.steampowered.com/app/2828540/RollerGirl/"
    },
    {
        id: "cloudbazaar",
        title: "The Cloud Bazaar",
        genre: "Side Scrolling Infinite Runner",
        description: "The Cloud Bazaar is an interactive therapeutic game designed with and for players with pediatric spinal muscular atrophy (SMA). Players are on a mission to stop the floating city from falling into the ocean. The sky pirates are threatening to steal the city’s only way to stay afloat.",
        techStack: ["Unity Engine", "C#"],
        contributions: [
            "Implemented an open source machine learning model for pose detection using webcam frame data. This model was able to run on basic laptops that had just a working webcam.",
            "Translated exercises into gameplay input using a custom made C# webcam pose detection system. The systems API allowed for the user to detect when an exercise had been performed, and how fast. These values were used to drive gameplay, essentially allowing the user to play the game with only a webcam and no IR sensors.",
            "Implemented user authorization and leader board system using PlayFab. Users were authenticated using emails and passwords. Verifications were done through PlayFabs dashboard interface."
        ],
        bannerImage: "assets/images/projects/CloudBazaar.png",
        screenshots: ["assets/images/screenshots/CB1.jpg","assets/images/screenshots/CB2.jpg","assets/images/screenshots/CB3.jpg"],
        storeLink: "https://store.steampowered.com/app/2222920/The_Cloud_Bazaar/"
    },
    {
        id: "hillagency",
        title: "Hill Agency: PURITYdecay",
        genre: "2.5D Side scrolling detective mystery",
        description: "Murdered sisters, mind altering drugs and flying cities, to a case that goes way further than the banks of this one detective's little neighbourhood in this Indigenous cybernoir detective narrative adventure set in a post-post-apocalyptical future.",
        techStack: ["Unreal Engine", "C++", "Blueprints", "Articy"],
        contributions: [
            "Created custom C++ data structures and Blueprint tools for narrative design work flow.",
            "Implemented a detective board system using narrative flags to add and remove items to the board."
        ],
        bannerImage: "assets/images/projects/HillAgency.png",
        screenshots: ["assets/images/screenshots/HA1.jpg","assets/images/screenshots/HA2.jpg","assets/images/screenshots/HA3.jpg"],
        storeLink: "https://store.steampowered.com/app/1358370/Hill_Agency_PURITYdecay/"
    }
];
