/*!
#   Bobby Chao - v1.0                 #
#   University of Winnipeg - PACE     #
#   https://www.bobbylkchao.com/      #
#   Released under MIT license        #
*/
var Show_Interval;//Define for Interval
var CountDown_Interval;//Define for Interval
var Player_Nickname;//User nickname
var Game_Time_Max_Count=60;//Maximum Game Count
var Scoreboard_Trump_Shows=0;//How many times Mr.Trump shows
var Scoreboard_Trudeau_Shows=0;//How many times Mr.Trudeau shows
var Scoreboard_Trump=0;//How many times has Mr.Trump been clicked
var Scoreboard_Trudeau=0;//How many times has Mr.Trudeau been clicked

/**
 * Config Image
 */
const image_folder_prefix = "_res";//Images store in which folder
const image_config_trump_img_array = ["img_1.png","img_2.png","img_3.png"];//Images for Trump
const image_config_explosion_img = "explosion.png";//Image for Explosion
const image_config_wrong_icon = "wrong.png";//Image for Wrong Icon
const image_config_trudeau_img = ["img_4.png"];//Images for Trudeau
const image_config_gameover_img = "gameover.png";

/**
 * Element Control
 */
var Element_Control = {
    create: function(type) {
        //type value: 'Trump' or 'Trudeau'
        var random_div_id = Create_Random_Name()+'_'+Math.round(Math.random()*1000);
        var random_div_left = Math.round(Math.random()*70) + '%';
        var random_div_right = Math.round(Math.random()*70) + '%';

        var random_img_file;
        if(type==='Trump'){
            Scoreboard_Trump_Shows++;
            random_img_file = image_folder_prefix + '/' + image_config_trump_img_array[Math.floor(Math.random()*image_config_trump_img_array.length)];
        }else if(type==='Trudeau'){
            Scoreboard_Trudeau_Shows++;
            random_img_file = image_folder_prefix + '/' + image_config_trudeau_img[Math.floor(Math.random()*image_config_trudeau_img.length)];
        }else{
            return;
        }
        
        var random_div = "<img class='awesomeguy' src='"+random_img_file+"' style='width:1%;position: absolute;left: "+random_div_left+";top: "+random_div_right+";' id='"+random_div_id+"' onclick=\"Image_Control.clickevent(this,'"+type+"');\">";
        $('body').append(random_div);

        setTimeout(() => {
            Image_Control.animation(random_div_id);
        }, 200);

        //return 'id';
    }
};

/**
 * Image Control
 */
var Image_Control = {
    animation: function(img_id) {
        var wValue=8 * $('#'+img_id).width(); 
        var hValue=8 * $('#'+img_id).height();
        $('#'+img_id).animate({width: wValue, height: hValue}, 3000); 
        setTimeout(() => {
            $('#'+img_id).remove();
        }, 3500);
    },
    clickevent: function(obj,type) {
        //type value: 'Trump' or 'Trudeau'
        if(type==='Trump'){
            $(obj).attr('src',image_folder_prefix + '/' + image_config_explosion_img);
            Scoreboard_Trump++;
        }else if(type==='Trudeau'){
            $(obj).attr('src',image_folder_prefix + '/' + image_config_wrong_icon);
            Scoreboard_Trudeau++;
        }
        $(obj).stop(true);
        $(obj).css('width','auto');
        $(obj).css('height','auto');
        setTimeout(() => {
            $(obj).remove();
        }, 300);
    },
};


/**
 * GameStart and GameOver Control
 */
var Game_CountDown_Value=3;
var GameStart_Element = {
    init: function() {    
        Player_Nickname=prompt("Please enter your nickname");
        if (Player_Nickname !== null && Player_Nickname !== ""){
            GameStart_Element.countdown(0);
        }else{
            GameStart_Element.init();
        }
    },
    countdown: function(type) {    
        //type value: 0 means init, 1 means not init
        $('#gamestart_div').html(Game_CountDown_Value);
        Game_CountDown_Value = Game_CountDown_Value-1;
        if(type===0){
            CountDown_Interval = setInterval("GameStart_Element.countdown(1)",1500);
        }
        
        if(Game_CountDown_Value===-1){
            $('#gamestart_div').html('>>>> Game Start <<<<');
            setTimeout(() => {
                $('#gamestart_div').html('');;
                GameStart_Element.startplay(0);
            }, 800);
            Game_CountDown_Value=3;
            clearInterval(CountDown_Interval);
        }
    },
    startplay: function() {
        Create_Element();
        Fastest_Interval();
    }
};

function GameOver_Element(){
    clearInterval(Show_Interval);
    setTimeout(() => {
        $(".awesomeguy").each(function() {
            $(this).remove();
        })
        var finial_result = parseInt(Scoreboard_Trump)-parseInt(Scoreboard_Trudeau);
        if(Scoreboard_Trudeau===0&&Scoreboard_Trump===Scoreboard_Trump_Shows){
            finial_result = "Passed! Congratulations! Well Done!";
        }else{
            finial_result = "Your finial score is: " + finial_result + "/"+Scoreboard_Trump_Shows+", Keep it up!";
        }


        $('#gameover_div').fadeIn().html("<div class='gameover_div'><img src='_res/gameover.png'/></div>");
        $('#scoreboard_div').fadeIn().html(
            "<div class='scoreboard_title'>"+Player_Nickname+"\'s score</div>"+
            "<div class='scoreboard_green'>Trump: +"+Scoreboard_Trump+"/"+Scoreboard_Trump_Shows+"</div>"+
            "<div class='scoreboard_red'>Trudeau: -"+Scoreboard_Trudeau+"</div>"+
            "<div class='scoreboard_finial'>"+finial_result+"</div>"
        );
    }, 1000);//add timeout here, is wanna make it hide more smoother
}

/**
 * Init
 */
GameStart_Element.init();

/**
 * Create Element
 */
function Create_Element(){
    Game_Time_Max_Count = Game_Time_Max_Count-1;
    $('#gamestart_div').html(Game_Time_Max_Count);
    if(Game_Time_Max_Count===0){
        $('#gamestart_div').remove();
        GameOver_Element();
        return;
    }
    //Generate img element, random position
    var t_random_v = Math.round(Math.random()*1);
    if(t_random_v===1){
        Element_Control.create('Trump');
    }else if(t_random_v===0){
        Element_Control.create('Trudeau');
    }
}

/**
 * Create Random Name
 */
function Create_Random_Name() {
    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var idvalue = '';
    var n = 4; //How many words u wanna create
    for (var i = 0; i < n; i++) {
        idvalue += arr[Math.floor(Math.random() * 26)];
    }
    return idvalue;
}

/**
 * Interval
 */
function Default_Interval(){
    try{clearInterval(Show_Interval);}catch(err){}
    Show_Interval = setInterval("Create_Element()",1500);
}
function Fastest_Interval(){
    try{clearInterval(Show_Interval);}catch(err){}
    Show_Interval = setInterval("Create_Element()",700);
}

function Slow_Interval(){
    try{clearInterval(Show_Interval);}catch(err){}
    Show_Interval = setInterval("Create_Element()",2000);
}

console.log("%cTrump or Trudeau","color: red; font-size: 20px");
console.log("Bobby Chao - v1.0\nUniversity of Winnipeg - PACE\nhttps://www.bobbylkchao.com/\nReleased under MIT license\n");