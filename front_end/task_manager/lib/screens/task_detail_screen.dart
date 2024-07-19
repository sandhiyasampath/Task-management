import 'package:flutter/material.dart';
import '../models/task.dart';
import '../service/api_service.dart';

class TaskDetailScreen extends StatefulWidget {
  final Task? task;
  TaskDetailScreen({this.task});

  @override
  _TaskDetailScreenState createState() => _TaskDetailScreenState();
}

class _TaskDetailScreenState extends State<TaskDetailScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final ApiService _apiService = ApiService();
  String? _token;

  @override
  void initState() {
    super.initState();
    if (widget.task != null) {
      _titleController.text = widget.task!.title;
      _descriptionController.text = widget.task!.description;
    }
    _token = 'your_token_here'; // Get the token from a secure place
  }

  Future<void> _saveTask() async {
    final task = Task(
      id: widget.task?.id ?? 0,
      title: _titleController.text,
      description: _descriptionController.text,
      status: 'pending',
    );
    try {
      if (widget.task != null) {
        await _apiService.createTask(_token!, task);
      } else {
        // Handle create logic
      }
      Navigator.pop(context);
    } catch (e) {
      // Handle error
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.task != null ? 'Edit Task' : 'Create Task')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _titleController,
              decoration: InputDecoration(labelText: 'Title'),
            ),
            TextField(
              controller: _descriptionController,
              decoration: InputDecoration(labelText: 'Description'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _saveTask,
              child: Text('Save'),
            ),
          ],
        ),
      ),
    );
  }
}
