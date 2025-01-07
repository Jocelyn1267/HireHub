import { ListItem, Typography,List, FormControlLabel, Checkbox, Box, Button} from "@mui/material";
/**
 * The detail info of the Assessment
 */
export default function AssessmentDetail({handleSubmit}){
    const questions = [
        {
          question_id: 1,
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          correct_answer: "Paris"
        },
        {
          question_id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Jupiter", "Mars", "Saturn"],
          correct_answer: "Mars"
        },
        {
          question_id: 3,
          question: "What is the largest mammal?",
          options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
          correct_answer: "Blue Whale"
        },
        {
          question_id: 4,
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
          correct_answer: "William Shakespeare"
        },
        {
          question_id: 5,
          question: "What is the boiling point of water?",
          options: ["50°C", "100°C", "150°C", "200°C"],
          correct_answer: "100°C"
        },
        {
          question_id: 6,
          question: "Which element has the chemical symbol 'O'?",
          options: ["Oxygen", "Gold", "Osmium", "Iron"],
          correct_answer: "Oxygen"
        },
        {
          question_id: 7,
          question: "Which language is primarily spoken in Brazil?",
          options: ["Spanish", "Portuguese", "French", "English"],
          correct_answer: "Portuguese"
        },
        {
          question_id: 8,
          question: "How many continents are there on Earth?",
          options: ["5", "6", "7", "8"],
          correct_answer: "7"
        },
        {
          question_id: 9,
          question: "What is the square root of 64?",
          options: ["6", "7", "8", "9"],
          correct_answer: "8"
        },
        {
          question_id: 10,
          question: "What is the chemical formula for water?",
          options: ["H2O", "CO2", "O2", "NaCl"],
          correct_answer: "H2O"
        }
      ];
    
    var count = 1;

    return(
        <>
        <List>
            {questions.map((q) => (
                <ListItem key={q.question_id}>
                    <Box>
                    <Typography>
                        {count++ + ". " +q.question}
                    </Typography>
                    {q.options.map((option) =>(
                        <FormControlLabel control={<Checkbox />} label={option} />
                    ))}
                    </Box>
                </ListItem>
            ))}
        </List>
        <Button variant="contained" onClick={handleSubmit}> Submit</Button>
        </>
    );
}