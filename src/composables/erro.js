import { useSound } from "@vueuse/sound";
import erroSound from "@/assets/sound/erro.wav";

export default function useErro(){
    const { play } = useSound(erroSound);
    const erro = play;
    return erro;
}