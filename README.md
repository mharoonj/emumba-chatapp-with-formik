# About this App

This is a chat app made on frontend using formik library. This is an one to one chat with multiple people.

##### features
-  Users can be added.
-  User name can be updated.
	- Can not enter empty name.
-	 User name should be unique, for example, no two users can have name as haroon
-   User can be deleted.
-  Active user can be selected from the tab.
- Should change the color of active tab for better UI experience and to know which user is currently selected.
-  Users list with whom we can chat, appears on the left sidebar.
	- This list should not contain active user.
- Chating component shows chat between two users( one selected from tabs and other from sidebar)

- We can not send empty message to anyone.
- Once the message is sent other user receives notification with count of unread messages.


### Initial State of Formik
Two users Ali and Haroon. One message from each side.
![alt text](https://github.com/mharoonj/pics/blob/master/Initial%20state.JPG?raw=true)

### First look
** new user javed also added
![alt text](https://github.com/mharoonj/pics/blob/master/initial.JPG?raw=true)



### New Message from Haroon to Ali
A new notification on tab Ali appears saying that he has one new message.
![alt text](https://github.com/mharoonj/pics/blob/master/notification-on-new-msg.JPG?raw=true)

As soon as Ali opens message, it disappears.
![alt text](https://github.com/mharoonj/pics/blob/master/notification%20gone%20when%20read.JPG?raw=true)

### Editing User Name
Renaming Ali to sikandar
![alt text](https://github.com/mharoonj/pics/blob/master/renaming%20to%20sikandar.JPG?raw=true)
Renamed to sikandar
showing chat with sikandar and Haroon
![alt text](https://github.com/mharoonj/pics/blob/master/renamed%20to%20sikandar.JPG?raw=true)

### Adding more users
Users can be added. Two users can have same name.  By default User name would be in this format User x, (where x is unique number)
![alt text](https://github.com/mharoonj/pics/blob/master/adding%20more%20users.JPG?raw=true)





