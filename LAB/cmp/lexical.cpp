#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <regex>

int main() {
    std::ifstream file("input.txt"); // Open the input file

    if (!file.is_open()) { // Check if the file exists
        std::cerr << "Error opening file." << std::endl;
        return 1;
    }

    // Regular expressions
    std::regex char_var_regex("ch_[a-zA-Z0-9][a-zA-Z0-9]*");
    std::regex int_var_regex("[i-nI-N]_[a-zA-Z0-9]+");
    std::regex binary_regex("0(0|1)[01]*");
    std::regex int_number_regex("[1-9][0-9]*");

    std::string line;

    // Read and process the contents of the file line by line
    while (std::getline(file, line)) {
        std::istringstream iss(line);
        std::string token;

        // Tokenize by space or comma
        while (std::getline(iss, token, ',')) {
            std::istringstream token_iss(token);
            std::string subtoken;

            while (token_iss >> subtoken) {
                // Check if token matches any pattern
                if (std::regex_match(subtoken, char_var_regex)) {
                    std::cout << "Character variable " << subtoken << std::endl;
                } else if (std::regex_match(subtoken, int_var_regex)) {
                    std::cout << "Integer variable " << subtoken << std::endl;
                } else if (std::regex_match(subtoken, binary_regex)) {
                    std::cout << "Binary Number " << subtoken << std::endl;
                } else if (std::regex_match(subtoken, int_number_regex)) {
                    std::cout << "Integer Number " << subtoken << std::endl;
                } else {
                    std::cout << "Undefined " << subtoken << std::endl;
                }
            }
        }
    }

    file.close(); // Close the file

    return 0;
}
