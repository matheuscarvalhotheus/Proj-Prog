function dificuldade(){
    var mjogo = localStorage.getItem("mjogo");
    var dificuldade = localStorage.getItem("dificuldade");
    
    if(mjogo){
      if(mjogo=="criativo"){
       return 999;
      } else if(mjogo=="survival"){
        if(dificuldade=="fácil"){
          return 10;
        } else if(dificuldade=="normal"){
          return 5;
      } else if(dificuldade=="difícil"){
        return 3;
      }
    } else if(mjogo=="hardcore"){
      return 3;
    }
    } else {
      localStorage.setItem("mjogo","criativo");
      return 999;
    }
    };

    export default { dificuldade };