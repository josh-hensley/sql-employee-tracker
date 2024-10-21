import Cli from "./classes/Cli.js";
import art from "ascii-art";
const cli = new Cli();
async function printTitleCardAndStartCli() {
    const titleCard = await art.font('Employee Tracker', 'doom');
    console.log(titleCard);
    cli.startCli();
}
printTitleCardAndStartCli();
