#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(int argc, char *argv[]) {
    // Validate input arguments
    if (argc < 5) {
        printf("Too few arguments.\n");
        return 1;
    }

    // Names of the processes from command line
    char *parent_name = argv[1];
    char *child1_name = argv[2];
    char *child2_name = argv[3];
    char *child3_name = argv[4];

    printf("Parent Process Name: %s\n", parent_name);

    // Array to hold child process PIDs
    pid_t child_pids[3];

    // Create the first child process
    child_pids[0] = fork();
    if (child_pids[0] == 0) {
        printf("PID-%d\n", getpid());
        printf("%s process running.\n", child1_name);
        exit(0); // Ensure no grandchildren
    }

    // Create the second child process
    child_pids[1] = fork();
    if (child_pids[1] == 0) {
        printf("PID-%d\n", getpid());
        printf("%s process running.\n", child2_name);
        exit(0); // Ensure no grandchildren
    }

    // Create the third child process
    child_pids[2] = fork();
    if (child_pids[2] == 0) {
        printf("PID-%d\n", getpid());
        printf("%s process running.\n", child3_name);
        exit(0); // Ensure no grandchildren
    }

    // Wait for all child processes to complete
    for (int i = 0; i < 3; i++) {
        int status;
        pid_t finished_pid = waitpid(child_pids[i], &status, 0); // Wait for a specific child
        if (WIFEXITED(status)) {
            printf("Child %d successfully finished.\n", finished_pid);
        }
    }

    return 0;
}
