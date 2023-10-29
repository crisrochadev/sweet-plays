import { useSound } from "@vueuse/sound";
import sucessoSound from "@/assets/sound/sucesso.wav";

export default function useSucesso(){
    const { play } = useSound(sucessoSound);
    const sucesso = play;

    return sucesso;
}