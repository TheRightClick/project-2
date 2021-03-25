Media Categorization App:

link: https://media-gallery-project.herokuapp.com/


-user can create, comment on,  categorize, and view an image. 
-user can create new image in Db by linking to external site like sharepoint or publicly hosted site
-user can describe and categorize those images

Index: 
 

New: 

















Edit: 
 










GET /media, /:id, /:id/edit  - get info for editing and showing
POST / media      - create new 
PATCH /media/:id  -update existing
DELETE /media    -delete


mediaSchema = {
    fileName: {String, required}
    Category: String, 
    Description: String, 
    
}




stretch goals:
allow users to upload images. 
user logins
User Priveledges to delete/edit
allow users to upload csv with corresponding filenames to seed en masse
do an array of tags
add search
add filtering
add image recognition API
integrate image recognition into the tags
add video playback/upload
allow user to save comments/tags/categorize mulitple time codes, while not interrupting the video playback. 
allow user to navigate time codes they've created while streaming video to amend previous entry
allow users to create lists that allow them to add video/image to that list and view in one place. 
allow for 360 video support
