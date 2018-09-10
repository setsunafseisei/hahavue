import {RSAKey} from '@/assets/js/rsa/rsa.js'


function encryptPwd(pwd) {
    var rsa = new RSAKey();
    console.log(rsa);

    //openssl生成的modulus,十六进制数据
    var modulus = "FAE52A23E1F562544DBC8DEFAB846D99EFD36351D3AFF0ADB8653CA10744F7DB7A03E92BDA9B6BC4E7B0113B5ECAE0307BF6221CAB59EFDF7001BD26D596072795955DEEE6795DB37DF01AC1D57B0BDA65059B45CBCBC063C803E070303CF3D474863201A451C1F43C3F141D897FF6CFC99DAC4FA7EC6DE0F27695437F76E7D7";
    
    //openssl生成秘钥时的e的值(0x10001)
    var exponent = "10001";
    rsa.setPublic(modulus, exponent);

    var res = rsa.encrypt(pwd);
    
    return res
}

export{
    encryptPwd
}