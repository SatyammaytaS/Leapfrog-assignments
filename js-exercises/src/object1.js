/*Define an object containing information about
 yourself. The object needs to include 'name', 
'address', 'emails', 'interests' and 'education'. 
The 'education' key needs to be an array of 
objects containing keys 'name' and 'enrolledDate'.*/

let info = {
  fName: "Satyam Karki",
  address: "Satdobato, Lalitpur",
  emails: ["satyamkarki99@gmail.com", "fixosewa@gmail.com"],
  interests: ["football", "travelling", "movies"],
  education: [
    {
      name: "D.A.V school",
      enrolledDate: "2003"
    },
    {
      name: "United Academy",
      enrolledDate: "2014"
    },
    {
      name: "Kathmandu University",
      enrolledDate: "2017"
    }
  ]
};


let counter= info.education.length
for(let i=0; i<counter; i++){
  console.log(`Name: ${info.education[i].name}, Date: ${info.education[i].enrolledDate} `)
}