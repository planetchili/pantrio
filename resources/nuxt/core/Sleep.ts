export class Killswitch {
    private timeoutId: number|null = null;
    bind(timeoutId: number) {
        this.timeoutId = timeoutId;
    }
    clear() {
        this.timeoutId = null;
    }
    kill() {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
            this.clear();
        }
    }
}

export async function sleep(ms: number, ks: Killswitch|undefined) {
    if (ks != null) {
        return new Promise<void>(resolve => ks.bind(setTimeout(resolve, ms)));
    } else {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }
}
