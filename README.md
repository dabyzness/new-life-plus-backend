Here lives the backend for New Life+

---

### Create-Task-Form

Will require a very similar form for editing a task. Edit Form will need a _DELETE_ (or trashcan --> (Will display pop up to confirm if clicked)). It will also possibly need a _SKIP TOMORROW_ today in case you want to skip it the following day due to being unable to complete it. HOWEVER, this might be in a separate screen entirely --> _ENVISION TOMORROW_

**_Visible Inputs_**

1. **Name** --> Name of Task
2. **Frequency** --> How often you want to complete tasks
   1. Daily
   2. Weekly
   3. Monthly
3. **Frequency Modifiers**
   1. If Daily
      1. Can select Monday..Sunday, which days you want to perform task
   2. If Weekly
      1. Can select Every week or biweekly
   3. If Monthly
      1. No modifiers
4. **Repeatable** --> If task is repeatable (e.g. multiple times per day), enter amount
   1. I think this should be a checkbox to enable, otehrwise disabled
5. **Time to Complete** --> How long this task will take to complete, intervals of 5 mins.
   1. Same idea as "repeatable" --> checkbox to enable
   2. If this field is set, it will have a "Start" button next to it in the main screen to trigger the Timer screen.
6. **Start Time** --> Set a time during the day when you want to complete the task
   1. e.g. Morning Routine could be set for 8AM --> This will prevent it from being actionable from 12AM - 8AM.
   2. This feature will not exist until after we reach MVP, but you can add it to the drawings
7. **Submit / Cancel Buttons**

Additional:
A similar form will be needed for creating _ROUTINES_. Same type of fields as Tasks, but, there should be an option to _ADD TASK_ to routine (dropdown?). After a task has been selected to add, it should populate in an area below the dropbown, allowing for tasks to be rearranged.

---

### TIMER / QUEST / SCROLLABLE Screen

1. Avatar moving across a scrolling background -- possible enemies showing up that will be defeated once one of your tasks is completed.
   1. OOOO POSSIBLY EVEN A CHEST OR TREASURE WHEN YOU COMPLETE IT!
2. **Timer** counting down from your set amount of time
3. **Tasks** --> List of tasks pertaining to the _QUEST_ you're currently on.
   1. Ability to check-off each task as you complete it.
4. **Finish Button** --> Display and make actionable once all tasks have been complete, OR Timer has run out!
   1. If tasks have not been fully completed BEFORE the timer runs out, ask user if they would like to permanently increase time of the routine for future times.
5. **End Early Button** --> In case you really want to quit early.
   1. Display _CONFIRM TO END EARLY_ screen after clicking it. Notify the user that they will lose any xp or items gained, and lose 1 HP for every incomplete task.
