import {FormControl, MenuItem, Select, Typography} from "@mui/material";

// eslint-disable-next-line react/prop-types
export const TopicSelector = ({ selectedTopic, handleTopicChange, errorValue, errorMessage }) => {
    const topics = [
        'Select Topic *',
        'Finance',
        'Business',
        'Marketing',
        'Sales',
        'Design and Development',
        'Technology',
        'Education',
        'News',
        'Entertainment',
        'Travel',
        'Food and Drink',
        'Beauty and Fashion',
        'Health and Fitness',
        'Relationships',
        'Gaming',
        'Science and Medicine',
        'Home Ownership',
        'Lifestyle and Hobbies',
        'Pets',
        'Your Own Journey',
    ];

    return (
        <FormControl required error={errorValue}>
            <Select
                id="topic-select"
                value={selectedTopic}
                onChange={handleTopicChange}
                sx={{width:'23rem', color: errorValue?'#d32f2f':'gray'}}
            >
                {topics.map((topic) => (
                    <MenuItem key={topic} value={topic}>
                        {topic}
                    </MenuItem>
                ))}
            </Select>
            {errorValue && (
                <Typography variant="caption" color="error" sx={{pl:'1rem'}}>
                    {errorMessage}
                </Typography>
            )}
        </FormControl>
    );
};