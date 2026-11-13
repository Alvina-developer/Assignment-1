const taskTitle = process.argv[2];
if (!taskTitle) {
    console.log("Please provide a task title!");
} else {
    console.log("Your Task:", taskTitle);
}