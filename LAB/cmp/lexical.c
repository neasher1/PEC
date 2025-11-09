
#include <iostream>
#include <fstream>
#include <string>
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
        // Tokenize the input line
        size_t pos = 0;
        std::string token;
        while ((pos = line.find_first_of(" ,\n", pos)) != std::string::npos) {
            token = line.substr(0, pos);
            line.erase(0, pos + 1);

            // Check if token matches any pattern
            if (std::regex_match(token, char_var_regex)) {
                std::cout << "Character variable " << token << std::endl;
            } else if (std::regex_match(token, int_var_regex)) {
                std::cout << "Integer variable " << token << std::endl;
            } else if (std::regex_match(token, binary_regex)) {
                std::cout << "Binary Number " << token << std::endl;
            } else if (std::regex_match(token, int_number_regex)) {
                std::cout << "Integer Number " << token << std::endl;
            } else {
                std::cout << "Undefined " << token << std::endl;
            }
        }
    }

    file.close(); // Close the file

    return 0;
}
