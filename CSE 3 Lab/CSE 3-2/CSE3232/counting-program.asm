section .data 
    input_string db 'Hello, World!', 0    ; Input string null-terminated 
    vowels db 'aeiouAEIOU', 0              ; Vowel characters 
    count db 0                              ; Variable to store the vowel count 
 
section .text 
    global _start 
 
_start: 
    mov rsi, input_string                  ; Point to the input string 
    xor rcx, rcx                           ; Clear the vowel count (RCX will hold the count) 
 
next_char: 
    mov al, [rsi]                          ; Load the next character 
    test al, al                            ; Check for null terminator 
    jz done                                 ; If null, we're done 
 
    ; Check if the character is a vowel 
    mov rdi, vowels                        ; Point to the vowels string 
    mov rbx, 0                             ; Initialize index for vowels 
 
check_vowel: 
    mov bl, [rdi + rbx]                   ; Load a vowel character 
    test bl, bl                            ; Check for null terminator 
    jz not_vowel                           ; If null, it's not a vowel 
 
    cmp al, bl                             ; Compare input character with vowel 
    je is_vowel                             ; If equal, it's a vowel 
    inc rbx                                 ; Move to the next vowel 
    jmp check_vowel                        ; Check the next vowel 
 
is_vowel: 
    inc rcx                                 ; Increment the vowel count 
 
not_vowel: 
    inc rsi                                 ; Move to the next character 
    jmp next_char                          ; Repeat the process 
 
done: 
    ; Store the count in the count variable 
    mov [count], cl                        ; Store the count in the 'count' variable 
 
    ; Exit the program 
    mov rax, 60                             ; syscall: exit 
    xor rdi, rdi                            ; status: 0 
    syscall 