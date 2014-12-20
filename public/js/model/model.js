var myApp = angular.module('myApp',[]);
myApp.controller("scheduleController", function ($scope)
{
	console.log("Controller");
	$scope.getSchedules = function(){
		console.log("GET")
		$scope.schedules = EasyHour();
	};
	$scope.formatHour = function(value){
            var value2 = value+"";
            if(value2.length == 3)
                value2 = "0"+value2;
            value2 = value2.substring(0,2)+":"+value2.substring(2,4);
            return value2;
     };
 });
//------------------
// class Class
//------------------
var MONDAY = "Monday";
var TUESDAY = "Tuesday";
var WEDNESDAY = "Wednesday";
var THURSDAY = "Thursday";
var FRIDAY = "Friday!";
var SATURDAY = "Saturday";
//------------------
// constructor Class
//------------------
function Class(day,hInit,hEnd,classroom) 
{
	this.day = day;
	this.hInit = hInit;
	this.hEnd = hEnd; 
	this.classroom = classroom;
}
Class.prototype.classCross = function(c)
{
		if(c.day == this.day)
		{
			console.log("Dias iguales");
			var i = c.hInit;
			var f = c.hEnd;
			if(i < this.hInit && this.hInit < f)
			{
				console.log("i < this.hInit && this.hInit < f");
				return true;
			}
			if(i < this.hEnd && this.hEnd < f)
			{
				console.log("i < this.hEnd && this.hEnd < f");
				return true;
			}
			if(this.hInit < i && i < this.hEnd)
			{
				console.log("this.hInit < i && i < this.hEnd");
				return true;
			}	
			if(this.hInit < f && f < this.hEnd)
			{
				console.log("this.hInit < f && f < this.hEnd");
				return true;
			}	
			if(this.hInit == i && this.hEnd == f)
			{
				console.log("this.hInit == i && this.hEnd == f");
				return true;
			}
		}
		return false;
};
//------------------
// class Subject
//------------------
//------------------
// constructor Subject
//------------------
function Subject(name,credit)
{
	this.name = name;
	this.credit = credit;		
}
Subject.prototype.equals = function(s)
{
	if(this == s)
		return true;
	if(this.groups)
	return true;
}
//------------------
// class Group
//------------------
//------------------
// constructor Group
//------------------
function Group(nameProfessor,subject,id)
{
	this.nameProfessor = nameProfessor;
	this.subject = subject;
	this.id = id;
}
Group.prototype.cross = function(g)
{
	for(var i=0; i < g.classes.length; i++)
	{	
		for(var j=0; j < this.classes.length; j++)
		{
			if(g.classes[i].classCross(this.classes[j]))
			{
				return true;
			}	
		}
	}
	return false;
};
//------------------
// class Schedule
//------------------	
function Schedule(id)
{
	this.id = id;
	this.credits = 0;
}
//------------------
// class EasyHour
//------------------
var LIMIT_SUBJECTS = 8;
var LIMIT_CREDIT = 21;
//------------------
// constructor EasyHour
//------------------
function EasyHour() 
{
	var finales = [];
	var materias = getSubjets();
	var grupos = getGroupOfSubjects(materias);
	var iniciales = getShedulesInitOfGroups(grupos);
	for(var i=0; i< LIMIT_SUBJECTS+1; i++){
			finales[i] = [];
	}
	finales[1] = iniciales;
	combineSchedules(finales,iniciales,grupos,1);
	console.log(finales);
	return finales;
}
//------------------
// initialize Subjects 
//------------------
function getSubjets()
{
	var subjects = [];
	// Add new Subject with group and class
		var s1 = new Subject('Estructuras',3);
		subjects.push(s1);
		var g1  = new Group("Villota",s1,1);
		s1.groups = [];
		s1.groups.push(g1);
		var c1 = new Class(MONDAY,930 ,1100,"108C");
		var c2 = new Class(WEDNESDAY, 930,1100,"108C");
		var c3 = new Class(FRIDAY,1100 ,1300,"108C");
		g1.classes = [];
		g1.classes.push(c1);
		g1.classes.push(c2);
		g1.classes.push(c3);
	// end add new Subject

	// Add new Subject with group and class
		var s2 = new Subject('Ecuaciones',3);
		subjects.push(s2);
		var g2 = new Group("Yaker", s2,1);
		var g3 = new Group("Yaker", s2,3);
		s2.groups = [];
		s2.groups.push(g2);
		s2.groups.push(g3);

		c4 = new Class(TUESDAY,1400 ,1600,"102C");
		c5 = new Class(THURSDAY,1400 ,1600,"102C");
		g2.classes = [];
		g2.classes.push(c4);
		g2.classes.push(c5);
		
		c6 = new Class(TUESDAY,1700 ,1900);
		c7 = new Class(THURSDAY,1700 ,1900);
		g3.classes = [];
		g3.classes.push(c6);
		g3.classes.push(c7);
	// end add new Subject

	// Add new Subject with group and class
		var s3 = new Subject('Electricidad',4);
		subjects.push(s3);
		var g4 = new Group("Murillo", s3,1);
		var g5 = new Group("Triana", s3,3);
		s3.groups = [];
		s3.groups.push(g4);
		s3.groups.push(g5);

		var c8 = new Class(TUESDAY,1000 ,1230,"101D");
		var c9 = new Class(THURSDAY,1000 ,1230,"101D");
		g4.classes = [];
		g4.classes.push(c8);
		g4.classes.push(c9);
		
		var c10 = new Class(TUESDAY,1600 ,1830,"103B");
		var c11 = new Class(THURSDAY,1600 ,1830,"103B");
		g5.classes = [];
		g5.classes.push(c10);
		g5.classes.push(c11);
    // end add new Subject

    // Add new Subject with group and class
		var s4 = new Subject('Laboratorio Electricidad', 1);
		subjects.push(s4);
		var g6 = new Group("Marmolejo", s4,1);
		var g7 = new Group("Marmolejo", s4, 3);
		var g8 = new Group("Marmolejo", s4, 5);
		s4.groups = [];
		s4.groups.push(g6);
		s4.groups.push(g7);
		s4.groups.push(g8);
		var c12 = new Class(WEDNESDAY, 1400, 1600, "503L");
		g6.classes = [];
		g6.classes.push(c12);

		var c13 = new Class(WEDNESDAY, 1600, 1800, "503L");
		g7.classes = [];
		g7.classes.push(c13);

		var c14 = new Class(WEDNESDAY, 1100, 1300, "503L");
		g8.classes = [];
		g8.classes.push(c14);
    // end add new Subject

    // Add new Subject with group and class
/*		var s5 = new Subject('Inferencia', 3);
		subjects.push(s5);
		var g4 = new Group("Murillo", s5, 1);
		var g5 = new Group("Triana", s5, 3);
		s5.groups = [];
		s5.groups.push(g4);
		s5.groups.push(g5);

		var c8 = new Class(TUESDAY, 1000, 1230, "101D");
		var c9 = new Class(THURSDAY, 1000, 1230, "101D");
		g4.classes = [];
		g4.classes.push(c8);
		g4.classes.push(c9);

		var c10 = new Class(TUESDAY, 1600, 1830, "103B");
		var c11 = new Class(THURSDAY, 1600, 1830, "103B");
		g5.classes = [];
		g5.classes.push(c10);
		g5.classes.push(c11);*/
     // end add new Subject

	return subjects;
}
function getGroupOfSubjects(subjects)
{
	var groups = [];
	console.log("getGroupOfSubjects");
	for (var i = 0; i < subjects.length; i++)
	{
		var sub = subjects[i];
		for (var j = 0; j < sub.groups.length; j++)
		{
			var subgr = sub.groups[j];
			groups.push(subgr);
		}
	}
	
	return groups;
}
function getShedulesInitOfGroups(groups)
{
	var schedules = [];
	console.log("getShedulesInitOfGroups");
	for (var i = 0; i < groups.length; i++)
	{
		var h = new Schedule(i);
		h.groups = [];
		h.groups.push(groups[i]);
		schedules.push(h);
	}
	return schedules;
}
//------------------
// verify if the subjects are equals or have crosses
//------------------
function verify(group,schedule)
{
	var grs = schedule.groups;
	for (var j = 0; j < grs.length; j++) 
	{
		var gr = grs[j];
		if((gr.subject == group.subject) || (gr.cross(group))) 
			return false;
	}		
	return true;
}
//------------------
// combine schedules
//------------------
function combineSchedules(finales,schedule,grupos,pG)
{
	for (var i = 0; i < schedule.length; i++)
	{	
		var h = schedule[i];
		var lista = [];
		for (var j = grupos.indexOf(h.groups[h.groups.length-1])+1; j < grupos.length; j++)
		{
			var gr0 = grupos[j];
			if(verify(gr0,h))
			{
				var hT = $.extend(true, {}, h);
				hT.groups.push(gr0);
				lista.push(hT);
			}
		}
		if(lista.length !== 0)
		{
			var pos = lista[0].groups.length;
			$.each(lista,function(index,value){
				console.log(value); 
				finales[pos].push(value); 
			});	
			combineSchedules(finales, lista, grupos, ++pG);
		}	
	}
}
