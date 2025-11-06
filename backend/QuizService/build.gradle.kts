import com.diffplug.spotless.LineEnding

plugins {
	java
	id("org.springframework.boot") version "3.5.7"
	id("io.spring.dependency-management") version "1.1.7"
	id("com.diffplug.spotless") version "6.25.0"
}

group = "com.quizarena"
version = "0.0.1-SNAPSHOT"
description = "QuizArena"


java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(21)
	}
}

spotless {
	java {
		target("src/*/java/**/*.java")
		googleJavaFormat("1.23.0").aosp().reflowLongStrings()
		cleanthat().excludeMutator("ModifierOrder")
		importOrder()
		removeUnusedImports()
		trimTrailingWhitespace()
		endWithNewline()
		indentWithSpaces()
		formatAnnotations()
		lineEndings = LineEnding.UNIX
		replaceRegex("One blank line after package line", "(package .+;)\n+import", "$1\n\nimport")
		replaceRegex("One blank line after import lists", "(import .+;\n\n)\n+", "$1")
		replaceRegex("Remove wildcard imports", "import( static)?\\s+[^*\\s]+\\*;(\\r\\n|\\r|\\n)", "\$2")
		replaceRegex("Remove empty lines after start of block", "(\\{)\\s*\\n\\s*\\n", "$1\n")
		replaceRegex("Remove empty lines before end of block", "\\n[\\n]+(\\s*})(?=\\n)", "\n$1")
		replaceRegex("Remove trailing empty comment lines.", "\n\\s*\\*(\n\\s*\\*/\n)", "$1")
	}
	format("styling") {
		target(
			"**/*.json",
			"**/*.md",
			"**/*.yaml",
			"**/*.yml",
		)
		prettier()
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.mapstruct:mapstruct")
	annotationProcessor("org.mapstruct:mapstruct-processor")
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation( "org.springframework.boot:spring-boot-starter-validation")
	implementation("org.springframework.kafka:spring-kafka")
	compileOnly("org.projectlombok:lombok")
	runtimeOnly("org.postgresql:postgresql")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.kafka:spring-kafka-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<Test> {
	useJUnitPlatform()
}
