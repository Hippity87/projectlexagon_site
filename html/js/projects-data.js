// js/projects-data.js
const projects = [
  {
    id: "project1",
    title: "Fighterboi",
    description: "Game development with Unity, C# and Asesprite",
    category: "tech",
    image: "../images/fighterboi_01.jpg",
    githubLink: "https://github.com/Hippity87/fighterboi",
  },
  {
    id: "project2",
    title: "IoT-project",
    description:
      "Arduino Nano 33 IoT with Backend(Node.js+Express), Dashboard and Docker Infrastructure",
    category: "tech",
    image: "../images/iot-dashboard.png",
    githubLink: "https://github.com/Hippity87/iot-docker-project",
  },
  {
    id: "project3",
    title: "Valheim-server",
    description:
      "A live server configured for the game Valheim with linuxgsm and VirtualBox",
    category: "tech",
    image: "../images/valheim-1.jpg",
    githubLink: "https://youtu.be/UzIZxuJHfeE?si=-to8OL-Q1msWB70a",
  },
  {
    id: "project4",
    title: "Amp & Cabinet",
    description: "Self-built and designed Custom Amp & Cabinet",
    category: "design",
    image: "../images/project_amp/stack_04.jpg", // Placeholder path, update with your images
    viewProjectInfo: `
            <h2>Amp & Cabinet Details</h2>
            <p>This is a custom-built amplifier and cabinet designed for optimal sound quality.</p>
            <img src="../images/project_amp/stack_04.jpg" alt="Amp & Cabinet" style="max-width: 100%;">
            <p>More details about the build process...</p>
        `,
  },
  // Add more projects as needed
];
