# Events

The following list describes some of the possible webhook **`eventTypes`** (enums):

* ***ROOM_CREATED***: the first participant joins a room
* ***PARTICIPANT_LEFT***: a participant leaves the meeting
* ***PARTICIPANT_LEFT_LOBBY***: a participant leaves the lobby
* ***TRANSCRIPTION_UPLOADED***: a meeting transcription is uploaded
* ***CHAT_UPLOADED***: the meeting chat is successfully uploaded
* ***ROOM_DESTROYED***: the meeting room is destroyed after all of the participants have left
* ***PARTICIPANT_JOINED***: a new participant joins an ongoing meeting
* ***PARTICIPANT_JOINED_LOBBY***: a new participant joins the lobby
* ***RECORDING_STARTED***: the meeting recording is started
* ***RECORDING_ENDED***: the meeting recording is ended
* ***RECORDING_UPLOADED***: the meeting recording is uploaded
* ***LIVE_STREAM_STARTED***: live streaming started
* ***LIVE_STREAM_ENDED***: live streaming ended
* ***SETTINGS_PROVISIONING***: allow customers the option to define pre-meeting password and lobby settings
* ***SIP_CALL_IN_STARTED***: a sip call-in started
* ***SIP_CALL_IN_ENDED***: a sip call-in ended
* ***SIP_CALL_OUT_STARTED***: a sip call-out started
* ***SIP_CALL_OUT_ENDED***: a sip call-out ended
* ***FEEDBACK***: feedback is submitted
* ***DIAL_IN_STARTED***: the participant dial into the meeting
* ***DIAL_IN_ENDED***: the participant that dial has left the meeting
* ***DIAL_OUT_STARTED***: the dial participant has joined the meeting after being called
* ***DIAL_OUT_ENDED***: the dial participant that was called has left the meeting
* ***USAGE***: the event used for counting MAU (Monthly Active Users)
* ***SPEAKER_STATS***: the event used for counting how long every participant spoke.
* ***POLL_CREATED***: a poll was created
* ***POLL_ANSWER***: a user answered/updated an answer for a poll
* ***REACTIONS***: the participant sends a reaction
* ***AGGREGATED_REACTIONS***: all the reactions from the meeting
* ***SCREEN_SHARING_HISTORY***: snapshots that are taken from the screen share session when the recording is on
* ***VIDEO_SEGMENT_UPLOADED***: segments taken from the recording
* ***ROLE_CHANGED***: a non-moderator participant is given moderator rights
* ***RTCSTATS_UPLOADED***: a participant statistics file is available
* ***TRANSCRIPTION_CHUNK_RECEIVED***: a transcription phrase received during the meeting
* ***DOCUMENT_ADDED***: a new file/document has been added
* ***DOCUMENT_DELETED***: a file/document has been deleted
