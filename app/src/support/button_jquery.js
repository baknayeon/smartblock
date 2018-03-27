$(document).ready(function(){

	$('.share-btn').click(function(e){
		$(this).addClass("clicked");
       // jQuery('.share-btn').hide();
		//jQuery('.share-btn .close').show();    
		//jQuery('#'+this.id).show();    
    });


	$('.close').click(function (e) {
		//jQuery('#'+this.id).hide();
		//jQuery('.share-btn .close').hide();
	  $('.clicked').removeClass('clicked');
	  e.stopPropagation();
		//jQuery('.share-btn').show();  
	});
});

/*
a 9
b 5
14

c 7
d 6
13

e 3
f 2
g 2
7

h 1
i 4
J 0
5

K 0
l 3
m 9
11

n 1
o 5
p 5

11

Q 0
r 8

8

s 12

12

t 14

14

u 1
v 3

4

w 4
x 0
y 0
z 0
*/