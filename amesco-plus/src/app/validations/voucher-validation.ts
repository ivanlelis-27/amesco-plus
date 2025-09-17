export function validateVoucher(points: number, desired: number): string | null {
    if (desired > points) {
        return 'Desired voucher is more than your balance';
    }
    return null;
}